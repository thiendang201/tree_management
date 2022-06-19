<?php

namespace App\Http\Services\Tree;

use App\Http\Services\PestImage\PestImageService;
use App\Http\Services\PestStatus\PestStatusService;
use App\Http\Services\TreeImage\TreeImageService;
use App\Models\AnhCay;
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
    protected $treeImageService;
    protected $pestStatusService;

    public function __construct(TreeImageService $treeImageService, PestStatusService $pestStatusService)
    {
        $this->treeImageService=$treeImageService;
        $this->pestStatusService=$pestStatusService;
    }

    public function getAll($request){
        $all=$request->input('all');
//        return CayXanh::all();
        $query = DB::table('CayXanh')
            ->leftJoin('AnhCay', 'AnhCay.idCay', 'CayXanh.id')
            ->where('CayXanh.trangThai', '=', '1')
            ->orderBy('CayXanh.created_at')
            ->orderBy('AnhCay.created_at')
            ->groupBy('CayXanh.id');
//        return ['all'=> $all];
        if ($all=="true")
        {
            $result = $query->get($this->fields);
        }
        else
        {
            $result = $query->paginate($this->limit, $this->fields);
        }

        return $result;
    }

    public function getById($id){
//        $tree = CayXanh::find($id);
        $tree = DB::table('CayXanh')
            ->where('CayXanh.id', '=', $id)->get();
        foreach ($tree as $item)
        {
            $item->images=$this->treeImageService->getAllByTreeId($id);
            $item->pests=$this->pestStatusService->getAllByTreeId($id);
        }
        return $tree;
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

        $listTreeImage = $request->AnhCay;
        $listPestStatus= $request->tinhTrangSauBenh;

        $result = $tree->save();

        foreach ($listTreeImage as $item){
            $treeImage = $this->treeImageService->createByObject($item, $id);
        }

        foreach ($listPestStatus as $item){
            $pestStatus = $this->pestStatusService->createByObject($item, $id);
        }

        if ($result){
//            return ["Result" => "Data has been saved"];
            return $this->getById($id);
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
        $listId = $request->input('ids');
//        return $listId;
        foreach ($listId as $id)
        {
            $tree = CayXanh::find($id);
            $tree->trangThai = '0';
            $result = $tree->save();
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
