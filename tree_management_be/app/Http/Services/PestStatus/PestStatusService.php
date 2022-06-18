<?php

namespace App\Http\Services\PestStatus;

use App\Http\Services\PestImage\PestImageService;
use Illuminate\Support\Facades\DB;

class PestStatusService
{
    protected $fileds_pest = array('TinhTrangSauBenh.*', 'CayXanh.tenCay');
    protected $pestImageService;

    public function __construct(PestImageService $pestImageService)
    {
        $this->pestImageService=$pestImageService;
    }

    public function getAllByTreeId($id)
    {
        $result = DB::table('TinhTrangSauBenh')
            ->join('CayXanh', 'CayXanh.id', 'TinhTrangSauBenh.idCay')
            ->where('TinhTrangSauBenh.idCay', '=', $id)
            ->get($this->fileds_pest);
        foreach ($result as $item){
            $item->images=$this->pestImageService->getAllByPestId($item->id);
        }
        return $result;
    }
}
