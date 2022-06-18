<?php

namespace App\Http\Services\Staff;

use Illuminate\Support\Facades\DB;

class StaffService
{
    public function getAll()
    {
        $result = DB::table('NhanVien')->get();
        return $result;
    }
}
