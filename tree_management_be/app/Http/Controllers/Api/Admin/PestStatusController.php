<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Services\PestStatus\PestStatusService;
use Illuminate\Http\Request;

class PestStatusController extends Controller
{
    protected $pestStatusService;

    public function __construct(PestStatusService $pestStatusService){
        $this->pestStatusService=$pestStatusService;
    }

    public function index(Request $request)
    {
        $pestStatus = $this->pestStatusService->getAllByTree($request);
        return $pestStatus;
    }

    public function getById($id)
    {
        $pest = $this->pestStatusService->getById($id);
        return $pest;
    }

    public function create(Request $request)
    {
        $result = $this->pestStatusService->create($request);
        return $result;
    }

    public function update(Request $request)
    {
        $result = $this->pestStatusService->update($request);
        return $result;
    }

    public function delete(Request $request)
    {
        $result = $this->pestStatusService->delete($request);
        return $result;
    }
}
