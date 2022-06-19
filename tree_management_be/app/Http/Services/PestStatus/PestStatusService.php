<?php

namespace App\Http\Services\PestStatus;

use App\Helpers\Helper;
use App\Http\Services\PestImage\PestImageService;
use App\Models\TinhTrangSauBenh;
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

    public function getAllByTree($request)
    {
        $id = $request->id;
        $result = DB::table('TinhTrangSauBenh')
            ->join('CayXanh', 'CayXanh.id', 'TinhTrangSauBenh.idCay')
            ->where('TinhTrangSauBenh.idCay', '=', $id)
            ->get($this->fileds_pest);
        return $result;
    }

    public function getById($id){
        $pest = DB::table('TinhTrangSauBenh')
            ->where('TinhTrangSauBenh.id', '=', $id)->get();
        return $pest;
    }

    public function create($request){
        $pest = new TinhTrangSauBenh();
        $prefix='TTSB';
        $table='TinhTrangSauBenh';
        $id = Helper::auto_id($prefix, $table);
        $pest->id = $id;
        $pest->tenBenh = $request->tenBenh;
        $pest->moTa = $request->moTa;
        $pest->mucDo = $request->mucDo;
        $pest->ngayPhatBenh = $request->ngayPhatBenh;
        $pest->ngayHet = null;
        $pest->idCay = $request->idCay;
        $result = $pest->save();
        if ($result){
            return ["Result" => "Data has been saved"];
        }
        else
        {
            return ["Result" => "Operation failed"];
        }
    }

    public function update($request){
        $pest = TinhTrangSauBenh::find($request->id);
        $pest->tenBenh = $request->tenBenh;
        $pest->moTa = $request->moTa;
        $pest->mucDo = $request->mucDo;
        $pest->ngayPhatBenh = $request->ngayPhatBenh;
        $pest->ngayHet = $request->ngayHet;
        $pest->idCay = $request->idCay;
        $result = $pest->save();
        if ($result){
            return ["Result" => "Data has been updated"];
        }
        else
        {
            return ["Result" => "Update operation has been failed"];
        }
    }

    public function delete($request)
    {
        $listId = $request->input('ids');
        foreach ($listId as $id)
        {
            $pest = TinhTrangSauBenh::find($id);
            $result = $pest->delete();
        }
        if ($result)
        {
            return ["result"=>"delete success"];
        }
        else
        {
            return ["result"=>"delete error"];
        }
    }
}
