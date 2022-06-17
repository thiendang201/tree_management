<?php

namespace App\Http\Services\TreeCategory;

use Illuminate\Support\Facades\DB;

class TreeCategoryService
{
    public function getAll(){
        return DB::table('LoaiCay')
            ->leftJoin("CayXanh", "CayXanh.idLoaiCay", "LoaiCay.id")
            ->orderBy('LoaiCay.created_at')
            ->groupBy('idLoaiCay')
            ->get([
                "LoaiCay.id",
                "tenLoaiCay",
                DB::raw('count(idLoaiCay) as count')
        ]);
    }
}
