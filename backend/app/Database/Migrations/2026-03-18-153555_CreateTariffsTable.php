<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateTariffsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 5,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'product_name' => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
            ],
            'hs_code' => [
                'type'       => 'VARCHAR',
                'constraint' => '20',
            ],
            'tariff_rate' => [
                'type'       => 'DECIMAL',
                'constraint' => '5,2',
            ],
            'country' => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
            ],
            'effective_date' => [
                'type' => 'DATE',
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('tariffs');
    }

    public function down()
    {
        $this->forge->dropTable('tariffs');
    }

}
