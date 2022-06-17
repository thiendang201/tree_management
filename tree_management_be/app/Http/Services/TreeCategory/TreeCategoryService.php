<?php

namespace App\Http\Services\TreeCategory;

use Illuminate\Support\Facades\DB;

class TreeCategoryService
{
    public function getAll(){
        return DB::table('LoaiCay')
            ->join("CayXanh", "CayXanh.idLoaiCay", "LoaiCay.id")
            ->groupBy('idLoaiCay')
            ->get([
                "LoaiCay.id",
                "tenLoaiCay",
                DB::raw('count(idLoaiCay) as count')
        ]);
    }
}
