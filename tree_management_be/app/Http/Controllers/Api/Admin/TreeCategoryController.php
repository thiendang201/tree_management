<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Services\TreeCategory\TreeCategoryService;
use Illuminate\Http\Request;

class TreeCategoryController extends Controller
{
    //
    protected $treeCategoryService;
    public function __construct(TreeCategoryService $treeCategoryService){
        $this->treeCategoryService=$treeCategoryService;
    }
    public function index()
    {
        $treeCategories = $this->treeCategoryService->getAll();
        return $treeCategories;
    }
}
