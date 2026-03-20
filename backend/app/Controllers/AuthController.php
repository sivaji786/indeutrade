<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

class AuthController extends ResourceController
{
    use ResponseTrait;

    public function login()
    {
        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');

        $db = \Config\Database::connect();
        $user = $db->table('users')->where('email', $email)->get()->getRowArray();

        if (!$user || !password_verify($password, $user['password'])) {
            return $this->failUnauthorized('Invalid email or password');
        }

        return $this->respond([
            'status' => 200,
            'message' => 'Login successful',
            'user' => [
                'email' => $user['email'],
                'role' => $user['role']
            ]
        ]);
    }
}
