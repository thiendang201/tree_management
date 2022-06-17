<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Services\Tree\TreeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TreeController extends Controller
{
    protected $treeService;

    public function __construct(TreeService $treeService){
        $this->treeService=$treeService;
    }

//    public function index($id=null)
//    {
//        $trees = $this->treeService->getAll($id);
//        return $trees;
//    }

    public function index()
    {
        $trees = $this->treeService->getAll();
        return $trees;
    }

    public function getById($id)
    {
        $trees = $this->treeService->getById($id);
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

    public function delete(Request $request)
    {
        $result = $this->treeService->delete($request);
        return $result;
    }

    public function search(Request $request)
    {
        $result = $this->treeService->search($request);
        return $result;
    }

    public static function auto_id()
    {
        $stringId = DB::table('CayXanh')->pluck('id');
        $lenPrefix = strlen('CX');
        $idList = [];
        foreach ($stringId as $id)
        {
            array_push($idList, (int) substr($id, $lenPrefix));
        }
        return max($idList)+1;
    }
}
