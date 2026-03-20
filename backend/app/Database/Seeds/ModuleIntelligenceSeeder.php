<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class ModuleIntelligenceSeeder extends Seeder
{
    public function run()
    {
        // FTA Roadmaps
        $roadmaps = [
            [
                'date_label' => 'Jan 2026',
                'title' => 'India-EU FTA Phase 1',
                'description' => 'Zero-duty for 70% of machinery chapters. Introduction of digital carbon pass.',
                'icon_type' => 'Zap',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'date_label' => 'April 2026',
                'title' => 'India-UK CETA Launch',
                'description' => 'Automotive and Electronics chapters transition to preferential regional rates.',
                'icon_type' => 'Globe2',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'date_label' => 'June 2026',
                'title' => 'Unified Data Portal',
                'description' => 'Mandatory AI-integrated certification for all EU-bound chemical shipments.',
                'icon_type' => 'ShieldCheck',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'date_label' => '2027+',
                'title' => 'Full Corridor Integration',
                'description' => '100% duty-free trade across all identified strategic industrial clusters.',
                'icon_type' => 'Clock',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        ];
        $this->db->table('fta_roadmaps')->insertBatch($roadmaps);

        // FTA Corridors
        $corridors = [
            [
                'name' => 'India - Germany',
                'growth' => '+24%',
                'status' => 'High Momentum',
                'duty' => '0.0%',
                'volume' => '$4.2B',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'India - UK',
                'growth' => '+18%',
                'status' => 'Stable',
                'duty' => '0.2%',
                'volume' => '$2.8B',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'India - Netherlands',
                'growth' => '+31%',
                'status' => 'Fast Growing',
                'duty' => '0.0%',
                'volume' => '$1.9B',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        ];
        $this->db->table('fta_corridors')->insertBatch($corridors);

        // Regulations Matrix
        $matrix = [
            [
                'hsn_chapter' => 'HS 85: Electronics',
                'status' => 'Mandatory',
                'protocol' => 'EU-FMD / DSCSA',
                'deadline' => 'April 2026',
                'risk_level' => 'High',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'hsn_chapter' => 'HS 30: Pharma',
                'status' => 'Active',
                'protocol' => 'Track & Trace 2.0',
                'deadline' => 'Jan 2026',
                'risk_level' => 'Critical',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'hsn_chapter' => 'HS 84: Machinery',
                'status' => 'Pending',
                'protocol' => 'Digital Green Pass',
                'deadline' => 'June 2026',
                'risk_level' => 'Medium',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        ];
        $this->db->table('regulations_matrix')->insertBatch($matrix);

        // Regulatory Alerts
        $alerts = [
            [
                'title' => 'EU Packaging Waste Regs 2026',
                'type' => 'Critical',
                'description' => 'New mandatory recyclability certifications for all industrial packaging in the EU node.',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'title' => 'UK Border Target Operating Model',
                'type' => 'Warning',
                'description' => 'Phased implementation of new SPS controls for India-UK corridor entries.',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        ];
        $this->db->table('regulatory_alerts')->insertBatch($alerts);
    }
}
