<?php

namespace App\Http\Services\Staff;

use App\Models\NhanVien;
use Illuminate\Support\Facades\DB;

class StaffService
{
    public function getAllByRole()
    {
        $result = DB::table('NhanVien')
            ->where('NhanVien.idQuyen', '=', 'Q3')
            ->get();
//        $result = NhanVien::all();
        return $result;
    }
}
