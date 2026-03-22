<?php

namespace App\Controllers\Admin;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;

class Wiki extends BaseController
{
    use ResponseTrait;

    protected $docsPath;

    public function __construct()
    {
        $this->docsPath = ROOTPATH . '../docs/';
    }

    /**
     * List all markdown files in the docs folder
     */
    public function index()
    {
        if (!is_dir($this->docsPath)) {
            return $this->failNotFound('Docs directory not found.');
        }

        $files = scandir($this->docsPath);
        $mdFiles = [];

        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'md') {
                $mdFiles[] = [
                    'filename' => $file,
                    'title' => $this->getFileTitle($file),
                    'path' => $file
                ];
            }
        }

        return $this->respond($mdFiles);
    }

    /**
     * Get content of a specific markdown file
     */
    public function show($filename = null)
    {
        if ($filename === null) {
            return $this->fail('Filename is required.');
        }

        // Security check: prevent directory traversal
        $filename = basename($filename);
        $filePath = $this->docsPath . $filename;

        if (!file_exists($filePath) || pathinfo($filePath, PATHINFO_EXTENSION) !== 'md') {
            return $this->failNotFound('File not found.');
        }

        $content = file_get_contents($filePath);
        
        return $this->respond([
            'filename' => $filename,
            'title' => $this->getFileTitle($filename),
            'content' => $content
        ]);
    }

    /**
     * Helper to get title from filename or first H1
     */
    private function getFileTitle($filename)
    {
        $filePath = $this->docsPath . $filename;
        if (file_exists($filePath)) {
            $handle = fopen($filePath, 'r');
            if ($handle) {
                while (($line = fgets($handle)) !== false) {
                    $line = trim($line);
                    if (str_starts_with($line, '# ')) {
                        fclose($handle);
                        return substr($line, 2);
                    }
                }
                fclose($handle);
            }
        }

        // Fallback to humanizing the filename
        $name = pathinfo($filename, PATHINFO_FILENAME);
        return str_replace(['_', '-'], ' ', ucfirst($name));
    }
}
