<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateSyncLogsTable extends Migration
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
            'status' => [
                'type'       => 'ENUM',
                'constraint' => ['success', 'failed', 'pending'],
                'default'    => 'pending',
            ],
            'records_synced' => [
                'type'       => 'INT',
                'constraint' => 11,
                'default'    => 0,
            ],
            'triggered_by' => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
                'null'       => true,
            ],
            'error_message' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'created_at datetime default current_timestamp',
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('sync_logs');
    }

    public function down()
    {
        $this->forge->dropTable('sync_logs');
    }
}
