<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Services\Staff\StaffService;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    protected $staffService;
    public function __construct(StaffService $staffService){
        $this->staffService=$staffService;
    }

    public function getAllByRole()
    {
        $result = $this->staffService->getAllByRole();
        return $result;
    }

}
