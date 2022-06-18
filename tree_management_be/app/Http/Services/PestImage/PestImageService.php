<?php

namespace App\Http\Services\PestImage;

use Illuminate\Support\Facades\DB;

class PestImageService
{
    protected $fileds_image = array('AnhSauBenh.*', 'TinhTrangSauBenh.id', 'TinhTrangSauBenh.tenBenh');

    public function getAllByPestId($id)
    {
        $result = DB::table('AnhSauBenh')
            ->join('TinhTrangSauBenh', 'TinhTrangSauBenh.id', 'AnhSauBenh.idSauBenh')
            ->where('AnhSauBenh.idSauBenh', '=', $id)
            ->get($this->fileds_image);
        return $result;
    }

}
