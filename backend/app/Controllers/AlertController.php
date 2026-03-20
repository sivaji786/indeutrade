<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;

class AlertController extends ResourceController
{
    protected $modelName = 'App\Models\AlertModel';
    protected $format    = 'json';

    public function index()
    {
        $userId = $this->request->getVar('user_id'); // In production, this would be from session/JWT
        if (!$userId) return $this->failUnauthorized('User context required for alerts');

        $alerts = $this->model->where('user_id', $userId)
                              ->orderBy('created_at', 'DESC')
                              ->findAll();

        // Dummy Generator for Phase 19 Demo if empty
        if (empty($alerts)) {
            $dummy = [
                [
                    'user_id' => $userId,
                    'message' => 'Compliance Deadline: The Jan 2026 FTA Roadmap for Machinery requires immediate review.',
                    'alert_type' => 'compliance',
                    'deadline' => '2026-05-15',
                    'is_read' => false
                ],
                [
                    'user_id' => $userId,
                    'message' => 'Tariff Shift Detected: UAE HS Code 8471 series duty decreased to 0%.',
                    'alert_type' => 'duty_shift',
                    'deadline' => null,
                    'is_read' => false
                ]
            ];
            foreach ($dummy as $d) $this->model->insert($d);
            $alerts = $this->model->where('user_id', $userId)->findAll();
        }

        return $this->respond($alerts);
    }

    public function markRead($id = null)
    {
        if (!$id) return $this->fail('Alert ID required');
        $this->model->update($id, ['is_read' => true]);
        return $this->respondUpdated(['id' => $id, 'status' => 'read']);
    }

    /**
     * Return a new resource object, with default properties.
     *
     * @return ResponseInterface
     */
    public function new()
    {
        //
    }

    /**
     * Create a new resource object, from "posted" parameters.
     *
     * @return ResponseInterface
     */
    public function create()
    {
        //
    }

    /**
     * Return the editable properties of a resource object.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function edit($id = null)
    {
        //
    }

    /**
     * Add or update a model resource, from "posted" properties.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function update($id = null)
    {
        //
    }

    /**
     * Delete the designated resource object from the model.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function delete($id = null)
    {
        //
    }
}
