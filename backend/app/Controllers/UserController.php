<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

class UserController extends ResourceController
{
    use ResponseTrait;

    protected $db;

    public function __construct()
    {
        $this->db = \Config\Database::connect();
    }

    public function index()
    {
        $users = $this->db->table('users')
                          ->select('id, email, role, created_at')
                          ->orderBy('created_at', 'DESC')
                          ->get()
                          ->getResultArray();

        return $this->respond($users);
    }

    public function create()
    {
        $data = [
            'email'    => $this->request->getVar('email'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT),
            'role'     => $this->request->getVar('role') ?? 'subscriber',
        ];

        if ($this->db->table('users')->insert($data)) {
            $data['id'] = $this->db->insertID();
            unset($data['password']);
            return $this->respondCreated([
                'status' => 201,
                'message' => 'User created successfully',
                'user' => $data
            ]);
        }

        return $this->fail('Failed to create user');
    }

    public function update($id = null)
    {
        $data = [
            'email' => $this->request->getVar('email'),
            'role'  => $this->request->getVar('role'),
        ];

        if ($this->request->getVar('password')) {
            $data['password'] = password_hash($this->request->getVar('password'), PASSWORD_BCRYPT);
        }

        if ($this->db->table('users')->where('id', $id)->update($data)) {
            return $this->respond([
                'status' => 200,
                'message' => 'User updated successfully'
            ]);
        }

        return $this->fail('Failed to update user');
    }

    public function delete($id = null)
    {
        if ($this->db->table('users')->where('id', $id)->delete()) {
            return $this->respondDeleted([
                'status' => 200,
                'message' => 'User deleted successfully'
            ]);
        }

        return $this->fail('Failed to delete user');
    }
}
