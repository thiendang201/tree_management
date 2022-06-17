<?php

namespace App\Http\Services\Tree;

use App\Models\CayXanh;
use Illuminate\Support\Facades\DB;
use App\Helpers\Helper;

class TreeService
{
//    public function getAll($id){
//        return $id?CayXanh::find($id):CayXanh::all();
//    }

    protected $limit = 5;
    protected $fields = array('CayXanh.*','AnhCay.hinhAnh as hinhAnh');

    public function getAll(){
//        return CayXanh::all();
        return DB::table('CayXanh')
            ->join('AnhCay', 'AnhCay.idCay', 'CayXanh.id')
            ->where('CayXanh.trangThai', '=', '1')
            ->groupBy('CayXanh.id')
            ->paginate(3, $this->fields);
    }

    public function getById($id){
        return CayXanh::find($id);
    }

    public function create($request){
        $tree = new CayXanh;
        $prefix='CX';
        $table='CayXanh';
        $id = Helper::auto_id($prefix, $table);
        $tree->id = $id;
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

    public function search($request)
    {
        $keyword = $request->input('keyword');
        $rs = DB::table('cayxanh')->where('tenCay', 'like', '%'.$keyword.'%')->get();
        return $rs;
    }
}
