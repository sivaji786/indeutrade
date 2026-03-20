<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'email'    => 'admin@indeutrade.com',
                'password' => password_hash('admin123', PASSWORD_BCRYPT),
                'role'     => 'admin',
            ],
            [
                'email'    => 'user1@indeutrade.com',
                'password' => password_hash('sub123', PASSWORD_BCRYPT),
                'role'     => 'subscriber',
            ],
            [
                'email'    => 'user2@indeutrade.com',
                'password' => password_hash('sub123', PASSWORD_BCRYPT),
                'role'     => 'subscriber',
            ],
        ];

        // Using Query Builder
        $this->db->table('users')->insertBatch($data);
    }
}
