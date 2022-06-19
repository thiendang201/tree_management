<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Services\PestImage\PestImageService;
use Illuminate\Http\Request;

class PestImageController extends Controller
{
    protected $pestImageService;

    public function __construct(PestImageService $pestImageService){
        $this->pestImageService=$pestImageService;
    }

    public function index(Request $request)
    {
        $pestImages = $this->pestImageService->getAllByPest($request);
        return $pestImages;
    }

    public function getById($id)
    {
        $image = $this->pestImageService->getById($id);
        return $image;
    }

    public function create(Request $request)
    {
        $result = $this->pestImageService->create($request);
        return $result;
    }

    public function update(Request $request)
    {
        $result = $this->pestImageService->update($request);
        return $result;
    }

    public function delete(Request $request)
    {
        $result = $this->pestImageService->delete($request);
        return $result;
    }
}
