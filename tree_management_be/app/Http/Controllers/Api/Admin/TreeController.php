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

    public function index($id=null)
    {
        $trees = $this->treeService->getAll($id);
        return $trees;
    }

//    public function getById($id)
//    {
//        $trees = $this->treeService->getById($id);
//        return $trees;
//    }

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

    public function search(Request $request)
    {
        $result = $this->treeService->search($request);
        return $result;
    }

//    public static function auto_id()
//    {
//        $prefix='CX';
//        $table='CayXanh';
//        $stringId = DB::table($table)->orderByDesc('id')->pluck('id')[0];
//        if ($stringId==null)
//        {
//            return $prefix.'1';
//        }
//        $maxId = substr($stringId, strlen($prefix))*1 ;
//        return $prefix.($maxId+1);
//    }
}
