<?php

namespace App\Models;

use CodeIgniter\Model;

class SyncLogModel extends Model
{
    protected $table            = 'sync_logs';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['status', 'records_synced', 'triggered_by', 'error_message'];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
}
