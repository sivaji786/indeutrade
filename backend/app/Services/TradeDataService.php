<?php

namespace App\Services;

class TradeDataService
{
    /**
     * Simulates fetching deep 2026 FTA intelligence for India-UK/EU trade corridors.
     */
    public function fetchGlobalIntelligence()
    {
        $data = [];
        $categories = ['Electronics', 'Textiles', 'Pharmaceuticals', 'Machinery', 'Chemicals'];
        $corridors = [
            ['source' => 'India', 'dest' => 'United Kingdom'],
            ['source' => 'India', 'dest' => 'European Union'],
            ['source' => 'United Kingdom', 'dest' => 'India'],
            ['source' => 'European Union', 'dest' => 'India'],
        ];

        // Generate 120 high-fidelity data points
        for ($i = 0; $i < 120; $i++) {
            $cat = $categories[rand(0, count($categories) - 1)];
            $corridor = $corridors[rand(0, count($corridors) - 1)];
            $hsPrefix = ['85', '87', '30', '52', '84'][rand(0, 4)];
            $hsFull = $hsPrefix . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
            
            $marketData = [];
            $subProducts = [
                'Electronics' => ['Micro-controllers', 'Sensor Arrays', 'Power ICs', 'Display Modules'],
                'Textiles' => ['Organic Cotton Thread', 'Recycled Polyester', 'Smart Fabrics', 'Industrial Mesh'],
                'Pharmaceuticals' => ['Active Ingredients', 'Excipients', 'Injectable Solutions', 'Biological Agents'],
                'Machinery' => ['Precision Gears', 'Hydraulic Pumps', 'Servo Motors', 'CNC Spindles'],
                'Chemicals' => ['Specialty Polymers', 'Catalytic Agents', 'Industrial Solvents', 'Pigment Pastes'],
            ];

            $manufacturers = [
                'India' => ['Tata Advanced', 'Reliance Bio', 'Infosys Tech', 'L&T Heavy'],
                'United Kingdom' => ['Rolls-Royce Intel', 'AstraZeneca UK', 'Babcock Global', 'ARM Systems'],
                'European Union' => ['Siemens Digital', 'Bayer AG', 'Airbus Defense', 'ASML Litho'],
            ];

            $origins = $manufacturers[$corridor['source']] ?? ['Global Source'];
            
            for ($j = 0; $j < 4; $j++) {
                $marketData[] = [
                    'product_name' => $subProducts[$cat][$j],
                    'manufacturer' => $origins[rand(0, count($origins) - 1)],
                    'capacity'     => rand(100, 5000) . ' Units/Month',
                    'lead_time'    => rand(2, 12) . ' Weeks',
                ];
            }

            $data[] = [
                'product_name'      => $cat . ' Intelligence Pack #' . ($i + 1),
                'hs_code'           => $hsFull,
                'tariff_rate'       => number_format(rand(0, 1200) / 100, 2),
                'country'           => $corridor['dest'],
                'source_country'    => $corridor['source'],
                'destination_country'=> $corridor['dest'],
                'category'          => $cat,
                'effective_date'    => '2026-' . str_pad(rand(1, 12), 2, '0', STR_PAD_LEFT) . '-01',
                'hsn_description'   => "Advanced " . strtolower($cat) . " component optimized for " . $corridor['source'] . " to " . $corridor['dest'] . " trade protocols under 2026 FTA standards.",
                'trade_volume'      => rand(50, 5000) . '.00',
                'market_growth'     => number_format(rand(200, 1500) / 100, 2),
                'regulatory_notes'  => "Compliance with " . $corridor['dest'] . " safety standards required. Rules of Origin (RoO) must satisfy 45% local value add.",
                'tax_info'          => "Applicable VAT/GST: " . rand(5, 28) . "%. Special economic zone exemptions may apply.",
                'market_data'       => json_encode($marketData),
            ];
        }

        return $data;
    }
}
