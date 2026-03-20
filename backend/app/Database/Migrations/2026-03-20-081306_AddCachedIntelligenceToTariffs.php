<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddCachedIntelligenceToTariffs extends Migration
{
    public function up()
    {
        $fields = [
            'cached_ai_intelligence' => [
                'type' => 'LONGTEXT',
                'null' => true,
                'after' => 'compliance_deadline'
            ],
        ];
        $this->forge->addColumn('tariffs', $fields);
    }

    public function down()
    {
        $this->forge->dropColumn('tariffs', 'cached_ai_intelligence');
    }
}
