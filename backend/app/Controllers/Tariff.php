<?php

namespace App\Controllers;

use App\Models\TariffModel;
use CodeIgniter\RESTful\ResourceController;

class Tariff extends ResourceController
{
    protected $modelName = 'App\Models\TariffModel';
    protected $format    = 'json';

    public function index()
    {
        $limit    = max(1, (int) ($this->request->getVar('limit') ?? 20));
        $offset   = max(0, (int) ($this->request->getVar('offset') ?? 0));
        $sort     = $this->request->getVar('sort') ?? 'product_name';
        $order    = strtoupper($this->request->getVar('order') ?? 'ASC');

        // Validation
        $allowedSorts = ['product_name', 'hs_code', 'tariff_rate', 'country', 'category'];
        if (!in_array($sort, $allowedSorts)) $sort = 'product_name';
        if (!in_array($order, ['ASC', 'DESC'])) $order = 'ASC';

        $category = $this->request->getVar('category');
        $search   = $this->request->getVar('search');

        if ($category) {
            $this->model->where('category', $category);
        }

        if ($search) {
            $this->model->groupStart()
                        ->like('product_name', $search)
                        ->orLike('hs_code', $search)
                        ->orLike('country', $search)
                        ->groupEnd();
        }

        $data = $this->model->orderBy($sort, $order)
                            ->findAll($limit, $offset);

        return $this->respond($data);
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) return $this->failNotFound('Product intelligence not found');
        return $this->respond($data);
    }

    public function aiIntelligence($id = null)
    {
        $product = $this->model->find($id);
        if (!$product) return $this->failNotFound('Product not found for AI synthesis');

        $refresh = $this->request->getVar('refresh') === 'true';

        // Check cache first
        if (!$refresh && !empty($product['cached_ai_intelligence'])) {
            return $this->respond(json_decode($product['cached_ai_intelligence'], true));
        }

        $gemini = new \App\Services\GeminiService();
        $intelligence = $gemini->synthesizeProductIntelligence(
            $product['hs_code'],
            $product['product_name'],
            $product['source_country'],
            $product['destination_country']
        );

        if ($intelligence) {
            $this->model->update($id, [
                'cached_ai_intelligence' => json_encode($intelligence)
            ]);
        }

        return $this->respond($intelligence);
    }

    public function categories()
    {
        $categories = $this->model->select('category')
                                  ->distinct()
                                  ->where('category !=', null)
                                  ->findAll();
        
        $list = array_column($categories, 'category');
        return $this->respond($list);
    }
}

