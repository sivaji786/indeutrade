<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddModuleIntelligenceTables extends Migration
{
    public function up()
    {
        // FTA Roadmaps
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'date_label' => ['type' => 'VARCHAR', 'constraint' => 50],
            'title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'description' => ['type' => 'TEXT'],
            'icon_type' => ['type' => 'VARCHAR', 'constraint' => 50],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('fta_roadmaps');

        // FTA Corridors
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'name' => ['type' => 'VARCHAR', 'constraint' => 255],
            'growth' => ['type' => 'VARCHAR', 'constraint' => 50],
            'status' => ['type' => 'VARCHAR', 'constraint' => 100],
            'duty' => ['type' => 'VARCHAR', 'constraint' => 50],
            'volume' => ['type' => 'VARCHAR', 'constraint' => 100],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('fta_corridors');

        // Regulations Matrix
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'hsn_chapter' => ['type' => 'VARCHAR', 'constraint' => 255],
            'status' => ['type' => 'VARCHAR', 'constraint' => 100],
            'protocol' => ['type' => 'VARCHAR', 'constraint' => 255],
            'deadline' => ['type' => 'VARCHAR', 'constraint' => 100],
            'risk_level' => ['type' => 'VARCHAR', 'constraint' => 50],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('regulations_matrix');

        // Regulatory Alerts
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'type' => ['type' => 'VARCHAR', 'constraint' => 50], // Critical, Warning, Info
            'description' => ['type' => 'TEXT'],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('regulatory_alerts');
    }

    public function down()
    {
        $this->forge->dropTable('fta_roadmaps');
        $this->forge->dropTable('fta_corridors');
        $this->forge->dropTable('regulations_matrix');
        $this->forge->dropTable('regulatory_alerts');
    }
}
