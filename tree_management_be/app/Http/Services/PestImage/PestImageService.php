<?php

namespace App\Http\Services\PestImage;

use App\Helpers\Helper;
use App\Models\AnhSauBenh;
use Illuminate\Support\Facades\DB;

class PestImageService
{
    protected $fileds_image = array('AnhSauBenh.*', 'TinhTrangSauBenh.tenBenh');

    public function getAllByPestId($id)
    {
        $result = DB::table('AnhSauBenh')
            ->join('TinhTrangSauBenh', 'TinhTrangSauBenh.id', 'AnhSauBenh.idSauBenh')
            ->where('AnhSauBenh.idSauBenh', '=', $id)
            ->get($this->fileds_image);
        return $result;
    }

    public function getAllByPest($request)
    {
        $id = $request->id;
        $result = DB::table('AnhSauBenh')
            ->join('TinhTrangSauBenh', 'TinhTrangSauBenh.id', 'AnhSauBenh.idSauBenh')
            ->where('AnhSauBenh.idSauBenh', '=', $id)
            ->get($this->fileds_image);
        return $result;
    }

    public function getById($id){
        $pestImage = DB::table('AnhSauBenh')
            ->where('AnhSauBenh.id', '=', $id)->get();
        return $pestImage;
    }

    public function create($request){
        $pestImage = new AnhSauBenh();
        $prefix='ASB';
        $table='AnhSauBenh';
        $id = Helper::auto_id($prefix, $table);
        $pestImage->id = $id;
        $pestImage->hinhAnh = $request->hinhAnh;
        $pestImage->idSauBenh = $request->idSauBenh;
        $result = $pestImage->save();
        if ($result){
            return ["Result" => "Data has been saved"];
        }
        else
        {
            return ["Result" => "Operation failed"];
        }
    }

    public function update($request){
        $pestImage = AnhSauBenh::find($request->id);
        $pestImage->hinhAnh = $request->hinhAnh;
        $pestImage->idSauBenh = $request->idSauBenh;
        $result = $pestImage->save();
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
            $pestImage = AnhSauBenh::find($id);
            $result = $pestImage->delete();
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
