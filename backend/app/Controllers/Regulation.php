<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\RegulationMatrixModel;
use App\Models\RegulatoryAlertModel;

class Regulation extends ResourceController
{
    protected $format = 'json';

    public function matrix()
    {
        $model = new RegulationMatrixModel();
        return $this->respond($model->findAll());
    }

    public function alerts()
    {
        $model = new RegulatoryAlertModel();
        return $this->respond($model->findAll());
    }

    public function updateMatrix($id = null)
    {
        $model = new RegulationMatrixModel();
        $data = $this->request->getJSON(true);
        if ($model->update($id, $data)) {
            return $this->respond(['status' => 'success', 'message' => 'Compliance matrix updated']);
        }
        return $this->fail('Update failed');
    }

    public function updateAlert($id = null)
    {
        $model = new RegulatoryAlertModel();
        $data = $this->request->getJSON(true);
        if ($model->update($id, $data)) {
            return $this->respond(['status' => 'success', 'message' => 'Regulatory alert updated']);
        }
        return $this->fail('Update failed');
    }
}
