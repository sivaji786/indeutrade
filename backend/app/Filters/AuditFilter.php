<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\AuditLogModel;

class AuditFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // We log after the action is processed, in 'after' method.
        // Or we capture the intent here.
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        $method = $request->getMethod();
        
        // Only log mutations (POST, PUT, DELETE)
        if (in_array(strtoupper($method), ['POST', 'PUT', 'DELETE'])) {
            $path = $request->getUri()->getPath();
            
            // Skip login logs or failed responses if desired
            if (strpos($path, 'login') !== false) return;
            if ($response->getStatusCode() >= 400) return;

            $auditModel = new AuditLogModel();
            
            // In a real app, user ID comes from Session/JWT
            // We'll try to get it from request or stick to 'System' (ID 1)
            $userId = $request->getVar('user_id') ?? 1; 

            $action = strtoupper($method);
            $entity = explode('/', trim($path, '/'))[1] ?? 'unknown';
            $entityId = explode('/', trim($path, '/'))[2] ?? null;

            $payload = json_encode($request->getVar());
            $data = [
                'user_id' => $userId,
                'action' => $action,
                'entity' => $entity,
                'entity_id' => is_numeric($entityId) ? (int)$entityId : null,
                'payload' => $payload,
                'ip_address' => $request->getIPAddress()
            ];

            $auditModel->insert((object)$data);
        }
    }
}
