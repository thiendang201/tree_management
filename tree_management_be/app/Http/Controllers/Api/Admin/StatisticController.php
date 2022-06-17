<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Services\Statistic\StatisticService;
use Illuminate\Http\Request;

class StatisticController extends Controller
{
    protected $statisticService;
    public function __construct(StatisticService $statisticService)
    {
        $this->statisticService=$statisticService;
    }
    public function statisticTree(Request $request)
    {
        $result = $this->statisticService->getAllTree($request);
        return $result;
    }
    public function statisticTrouble(Request $request)
    {
        $result = $this->statisticService->getAllTrouble($request);
        return $result;
    }
    public function statisticPlan(Request $request)
    {
        $result = $this->statisticService->getAllPlan($request);
        return $result;
    }
    public function getStaffByPlan(Request $request)
    {
        $result = $this->statisticService->getStaffByPlanId($request);
        return $result;
    }
}
