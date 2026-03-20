<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddMarketDataToTariffs extends Migration
{
    public function up()
    {
        $this->forge->addColumn('tariffs', [
            'market_data' => ['type' => 'TEXT', 'null' => true]
        ]);
    }

    public function down()
    {
        $this->forge->dropColumn('tariffs', 'market_data');
    }
}
