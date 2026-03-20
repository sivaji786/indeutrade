<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\FtaRoadmapModel;
use App\Models\FtaCorridorModel;

class Fta extends ResourceController
{
    protected $format = 'json';

    public function roadmaps()
    {
        $model = new FtaRoadmapModel();
        return $this->respond($model->findAll());
    }

    public function corridors()
    {
        $model = new FtaCorridorModel();
        return $this->respond($model->findAll());
    }

    public function updateRoadmap($id = null)
    {
        $model = new FtaRoadmapModel();
        $data = $this->request->getJSON(true);
        if ($model->update($id, $data)) {
            return $this->respond(['status' => 'success', 'message' => 'Roadmap updated']);
        }
        return $this->fail('Update failed');
    }

    public function updateCorridor($id = null)
    {
        $model = new FtaCorridorModel();
        $data = $this->request->getJSON(true);
        if ($model->update($id, $data)) {
            return $this->respond(['status' => 'success', 'message' => 'Corridor updated']);
        }
        return $this->fail('Update failed');
    }
}
