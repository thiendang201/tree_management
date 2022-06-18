<?php

namespace App\Http\Services\TreeImage;

use Illuminate\Support\Facades\DB;

class TreeImageService
{

    protected $fileds_image = array('AnhCay.*', 'CayXanh.id', 'CayXanh.tenCay');

    public function getAllByTreeId($id)
    {
        $result = DB::table('AnhCay')
            ->join('CayXanh', 'CayXanh.id', 'AnhCay.idCay')
            ->where('AnhCay.idCay', '=', $id)
            ->get($this->fileds_image);
        return $result;
    }

}
