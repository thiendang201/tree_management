<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Services\TreeImage\TreeImageService;
use Illuminate\Http\Request;

class TreeImageController extends Controller
{
    protected $treeImageService;

    public function __construct(TreeImageService $treeImageService){
        $this->treeImageService=$treeImageService;
    }

    public function index(Request $request)
    {
        $treeImages = $this->treeImageService->getAllByTree($request);
        return $treeImages;
    }

    public function getById($id)
    {
        $image = $this->treeImageService->getById($id);
        return $image;
    }

    public function create(Request $request)
    {
        $result = $this->treeImageService->create($request);
        return $result;
    }

    public function update(Request $request)
    {
        $result = $this->treeImageService->update($request);
        return $result;
    }

    public function delete(Request $request)
    {
        $result = $this->treeImageService->delete($request);
        return $result;
    }
}
