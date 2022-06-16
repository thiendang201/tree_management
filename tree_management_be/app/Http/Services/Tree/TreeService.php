<?php

namespace App\Http\Services\Tree;

use App\Models\CayXanh;

class TreeService
{
    public function getAll(){
        return CayXanh::all();
    }

    public function create($request){
        $tree = new CayXanh;
        $tree->tenCay = $request->tenCay;
        $tree->viTri = $request->viTri;
        $tree->ngayTrong = $request->ngayTrong;
        $tree->trangThai = $request->trangThai;
        $tree->idLoaiCay = $request->idLoaiCay;
        $result = $tree->save();
        if ($result){
            return ["Result" => "Data has been saved"];
        }
        else
        {
            return ["Result" => "Operation failed"];
        }
    }

    public function update($request){
        $tree = CayXanh::find($request->id);
        $tree->tenCay = $request->tenCay;
        $tree->viTri = $request->viTri;
        $tree->ngayTrong = $request->ngayTrong;
        $tree->trangThai = $request->trangThai;
        $tree->idLoaiCay = $request->idLoaiCay;
        $result = $tree->save();
        if ($result){
            return ["Result" => "Data has been updated"];
        }
        else
        {
            return ["Result" => "Update operation has been failed"];
        }
    }

    public function delete($id)
    {
        $tree = CayXanh::find($id);
        $result = $tree->delete();
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
