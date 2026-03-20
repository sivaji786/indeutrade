<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Services\TradeDataService;

class SyncController extends ResourceController
{
    protected $modelName = 'App\Models\SyncLogModel';
    protected $format    = 'json';

    public function index()
    {
        $db = \Config\Database::connect();
        $builder = $db->table('sync_logs');
        $logs = $builder->orderBy('created_at', 'DESC')->limit(10)->get()->getResult();
        
        return $this->respond($logs);
    }

    public function create()
    {
        $db = \Config\Database::connect();
        $syncBuilder = $db->table('sync_logs');
        $tariffBuilder = $db->table('tariffs');

        $service = new TradeDataService();
        $intelligenceData = $service->fetchGlobalIntelligence();
        $recordsSynced = count($intelligenceData);
        $triggeredBy = $this->request->getVar('triggered_by') ?? 'System Admin';

        // Clear existing mock data first to ensure fresh intelligence ingestion
        // In a real app, we would use upsert logic
        $tariffBuilder->truncate();
        
        // Batch Insert
        $tariffBuilder->insertBatch($intelligenceData);

        $data = [
            'status'         => 'success',
            'records_synced' => $recordsSynced,
            'triggered_by'   => $triggeredBy,
        ];

        $syncBuilder->insert($data);
        $insertId = $db->insertID();

        $newLog = $syncBuilder->where('id', $insertId)->get()->getRow();

        return $this->respondCreated($newLog);
    }
}
