<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddAlertsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'user_id' => [
                'type'       => 'INT',
                'constraint' => 11,
                'unsigned'   => true,
            ],
            'product_id' => [
                'type'       => 'INT',
                'constraint' => 11,
                'unsigned'   => true,
                'null'       => true,
            ],
            'message' => [
                'type' => 'TEXT',
            ],
            'alert_type' => [
                'type'       => 'VARCHAR',
                'constraint' => '50',
                'default'    => 'compliance',
            ],
            'deadline' => [
                'type' => 'DATE',
                'null' => true,
            ],
            'is_read' => [
                'type'    => 'BOOLEAN',
                'default' => false,
            ],
            'created_at datetime default current_timestamp',
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('user_id', 'users', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('product_id', 'tariffs', 'id', 'SET NULL', 'CASCADE');
        $this->forge->createTable('alerts');
    }

    public function down()
    {
        $this->forge->dropTable('alerts');
    }
}
