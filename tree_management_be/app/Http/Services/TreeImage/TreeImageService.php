<?php

namespace App\Http\Services\TreeImage;

use App\Helpers\Helper;
use App\Models\AnhCay;
use Illuminate\Support\Facades\DB;

class TreeImageService
{

    protected $fileds_image = array('AnhCay.*', 'CayXanh.tenCay');

    public function getAllByTreeId($id)
    {
        $result = DB::table('AnhCay')
            ->join('CayXanh', 'CayXanh.id', 'AnhCay.idCay')
            ->where('AnhCay.idCay', '=', $id)
            ->get($this->fileds_image);
        return $result;
    }

    public function getAllByTree($request)
    {
        $id = $request->id;
        $result = DB::table('AnhCay')
            ->join('CayXanh', 'CayXanh.id', 'AnhCay.idCay')
            ->where('AnhCay.idCay', '=', $id)
            ->get($this->fileds_image);
        return $result;
    }

    public function getById($id){
        $treeImage = DB::table('AnhCay')
            ->where('AnhCay.id', '=', $id)->get();
        return $treeImage;
    }

    public function create($request){
        $treeImage = new AnhCay();
        $prefix='AC';
        $table='AnhCay';
        $id = Helper::auto_id($prefix, $table);
        $treeImage->id = $id;
        $treeImage->hinhAnh = $request->hinhAnh;
        $treeImage->idCay = $request->idCay;
        $result = $treeImage->save();
        if ($result){
            return ["Result" => "Data has been saved"];
        }
        else
        {
            return ["Result" => "Operation failed"];
        }
    }

    public function update($request){
        $treeImage = AnhCay::find($request->id);
        $treeImage->hinhAnh = $request->hinhAnh;
        $treeImage->idCay = $request->idCay;
        $result = $treeImage->save();
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
            $treeImage = AnhCay::find($id);
            $result = $treeImage->delete();
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
