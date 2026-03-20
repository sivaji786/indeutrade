<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class TariffSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'product_name'   => 'Electric Vehicles',
                'hs_code'        => '870380',
                'tariff_rate'    => 5.00,
                'country'        => 'United Kingdom',
                'effective_date' => '2026-01-01',
            ],
            [
                'product_name'   => 'Solar Panels',
                'hs_code'        => '854143',
                'tariff_rate'    => 0.00,
                'country'        => 'European Union',
                'effective_date' => '2026-01-01',
            ],
            [
                'product_name'   => 'Textiles - Cotton Fabrics',
                'hs_code'        => '5208',
                'tariff_rate'    => 2.50,
                'country'        => 'United Kingdom',
                'effective_date' => '2026-01-01',
            ],
            [
                'product_name'   => 'Agricultural Machinery',
                'hs_code'        => '8432',
                'tariff_rate'    => 1.50,
                'country'        => 'European Union',
                'effective_date' => '2026-04-01',
            ],
            [
                'product_name'   => 'Pharmaceuticals',
                'hs_code'        => '3004',
                'tariff_rate'    => 0.00,
                'country'        => 'Norway',
                'effective_date' => '2026-01-01',
            ],
        ];

        // Using Query Builder
        $this->db->table('tariffs')->insertBatch($data);
    }

}
