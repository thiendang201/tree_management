<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Services\Tree\TreeService;
use App\Models\CayXanh;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TreeController extends Controller
{
    protected $treeService;

    public function __construct(TreeService $treeService){
        $this->treeService=$treeService;
    }

    public function index()
    {
        $trees = $this->treeService->getAll();
        return $trees;
    }

    public function create(Request $request)
    {
        $result = $this->treeService->create($request);
        return $result;
    }

    public function update(Request $request)
    {
        $result = $this->treeService->update($request);
        return $result;
    }

    public function delete($id)
    {
        $result = $this->treeService->delete($id);
        return $result;
    }
}
