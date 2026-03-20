<?php

namespace App\Controllers;

use App\Models\TariffModel;
use App\Models\FtaCorridorModel;
use CodeIgniter\RESTful\ResourceController;

class Analytics extends ResourceController
{
    protected $format = 'json';

    public function corridorPerformance()
    {
        $model = new TariffModel();
        
        // Aggregate ROI and Volume by Corridor
        $data = $model->select('source_country, destination_country, AVG(tariff_rate) as avg_duty, SUM(trade_volume) as total_volume, COUNT(*) as product_count')
                      ->groupBy('source_country, destination_country')
                      ->findAll();

        // Calculate a dummy ROI based on duty savings (12% baseline)
        foreach ($data as &$row) {
            $row['avg_roi'] = round(12 / (max(0.1, $row['avg_duty'])), 1) . 'x';
            $row['performance_score'] = round(($row['total_volume'] / 100) * 10);
        }

        return $this->respond($data);
    }

    public function sectorDistribution()
    {
        $model = new TariffModel();
        
        $data = $model->select('category, COUNT(*) as count, SUM(trade_volume) as volume')
                      ->groupBy('category')
                      ->findAll();

        return $this->respond($data);
    }

    public function tradeFlows()
    {
        // Data for Sankey: Source -> Category -> Destination
        $model = new TariffModel();
        $results = $model->select('source_country as source, category as node, destination_country as target, SUM(trade_volume) as value')
                         ->groupBy('source_country, category, destination_country')
                         ->findAll();

        return $this->respond($results);
    }
}
