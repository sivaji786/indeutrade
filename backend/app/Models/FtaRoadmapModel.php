<?php

namespace App\Models;

use CodeIgniter\Model;

class FtaRoadmapModel extends Model
{
    protected $table            = 'fta_roadmaps';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['date_label', 'title', 'description', 'icon_type'];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
}
