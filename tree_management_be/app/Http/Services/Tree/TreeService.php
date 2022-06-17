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

    protected $limit = 8;
    protected $fields = array('CayXanh.*','AnhCay.hinhAnh as hinhAnh');
    protected $field_search = array('CayXanh.*','LoaiCay.tenLoaiCay as tenLoaiCay');

    public function getAll(){
//        return CayXanh::all();
        return DB::table('CayXanh')
            ->leftJoin('AnhCay', 'AnhCay.idCay', 'CayXanh.id')
            ->where('CayXanh.trangThai', '=', '1')
            ->orderBy('CayXanh.id')
            ->orderBy('AnhCay.id')
            ->groupBy('CayXanh.id')
            ->paginate($this->limit, $this->fields);
//            ->get(array('CayXanh.*','AnhCay.hinhAnh as hinhAnh'));
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

    public function delete($request)
    {
        $listId = $request;
        return $listId;
        $tree = CayXanh::find($listId);
        $tree->trangThai = '0';
        $result = $tree->save();
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
//        $keyword = $request->input('keyword');
//        $rs = DB::table('cayxanh')->where('tenCay', 'like', '%'.$keyword.'%')->get();
//        return $rs;
        $tree_name = $request->input('tenCay');
        $area = $request->input('khuVuc');
        $tree_age = $request->input('tuoiCay');
        $tree_category = $request->input('loaiCay');
//        $result = DB::table('cayxanh')
//            ->join('LoaiCay', 'LoaiCay.id', 'CayXanh.idLoaiCay')
//            ->where('tenCay', 'like', "%".$tree_name."%")
//            ->where("viTri", 'like', "%".$area."%")
//            ->where('idLoaiCay', '=', $tree_category)
//            ->whereBetween(DB::raw('timestampdiff(YEAR, ngayTrong, date(now()))'), $tree_age)
//            ->paginate($this->limit, $this->field_search);
        $query = DB::table('cayxanh')
            ->join('LoaiCay', 'LoaiCay.id', 'CayXanh.idLoaiCay');
        if ($tree_name!=null)
        {
            $query->where('tenCay', 'like', "%".$tree_name."%");
        }
        if ($area!=null)
        {
            $query->where("viTri", 'like', "%".$area."%");
        }
        if ($tree_category!=null)
        {
            $query->where('idLoaiCay', '=', $tree_category);
        }
        if ($tree_age!=null)
        {
            $query->whereBetween(DB::raw('timestampdiff(YEAR, ngayTrong, date(now()))'), $tree_age);
        }
        $result=$query->paginate($this->limit, $this->field_search);
        return $result;
    }

}
