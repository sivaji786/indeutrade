<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddDeepIntelligenceToTariffs extends Migration
{
    public function up()
    {
        $fields = [
            'category'          => ['type' => 'VARCHAR', 'constraint' => 100, 'null' => true],
            'hsn_description'   => ['type' => 'TEXT', 'null' => true],
            'source_country'    => ['type' => 'VARCHAR', 'constraint' => 100, 'null' => true, 'after' => 'hsn_description'],
            'destination_country'=>['type' => 'VARCHAR', 'constraint' => 100, 'null' => true, 'after' => 'source_country'],
            'trade_volume'      => ['type' => 'DECIMAL', 'constraint' => '15,2', 'null' => true],
            'market_growth'     => ['type' => 'DECIMAL', 'constraint' => '5,2', 'null' => true],
            'regulatory_notes'  => ['type' => 'TEXT', 'null' => true],
            'tax_info'          => ['type' => 'TEXT', 'null' => true],
        ];

        $this->forge->addColumn('tariffs', $fields);
    }

    public function down()
    {
        $this->forge->dropColumn('tariffs', [
            'category', 'hsn_description', 'source_country', 'destination_country', 
            'trade_volume', 'market_growth', 'regulatory_notes', 'tax_info'
        ]);
    }
}
