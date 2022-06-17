<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Services\Plan\PlanService;
use App\Models\KeHoach;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    protected $planService;

    public function __construct(PlanService $planService){
        $this->planService=$planService;
    }

    public function index()
    {
        $plans = $this->planService->getAll();
        return $plans;
    }

    public function create(Request $request)
    {
        $result = $this->planService->create($request);
        return $result;
    }

    public function update(Request $request)
    {
        $result = $this->planService->update($request);
        return $result;
    }

    public function delete($id)
    {
        $result = $this->planService->delete($id);
        return $result;
    }
}
