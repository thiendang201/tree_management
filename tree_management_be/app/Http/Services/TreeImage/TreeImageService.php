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

    public function getById($id)
    {
        $treeImage = DB::table('AnhCay')
            ->where('AnhCay.id', '=', $id)->get();
        return $treeImage;
    }

    public function create($request)
    {
        $prefix = 'AC';
        $table = 'AnhCay';
//        $id = Helper::auto_id($prefix, $table);
//        $treeImage->id = $id;
//        $treeImage->hinhAnh = $request->hinhAnh;
//        $treeImage->idCay = $request->idCay;
//        return $request;
        $tree_id = $request->idCay;

        if (!$request->hasFile('hinhAnh')) {
            return response()->json(['upload_file_not_found'], 400);
        }

        $images = $request->file('hinhAnh');

        foreach ($images as $image) {
            $imageName = time() . rand(1, 1000) . '.' . $image->extension();
            $image->move(public_path('tree_image'), $imageName);

            //store image file into directory and db
            $save = new AnhCay();
            $id = Helper::auto_id($prefix, $table);
//          $save->title = $name;
            $save->id = $id;
            $save->hinhAnh = '/tree_image/'.$imageName;
            $save->idCay = $tree_id;
            $save->save();
        }
        return response()->json(['file_uploaded'], 200);
//        $treeImage->idCay = $request->idCay;
//        if ($tree_id==null) {
//            $treeImage->idCay = $request->idCay;
//        } else{
//            $treeImage->idCay = $tree_id;
//        }
//        $result = $treeImage->save();
//        if ($result){
//            return ["Result" => "Data has been saved"];
//        }
//        else
//        {
//            return ["Result" => "Operation failed"];
//        }
    }

    public function update($request)
    {
        $tree_id = $request->idCay;
//        return $tree_id;
        $deleted = $this->deleteByTreeId($tree_id);
        if ($deleted) {
            $created = $this->create($request);
            if ($created) {
                return response()->json(['file_updated'], 200);
            }
        }
        return response()->json(['file_update_fail'], 400);
//        $treeImage = AnhCay::find($request->id);
//        $treeImage->hinhAnh = $request->hinhAnh;
////        if ($tree_id==null) {
////            $treeImage->idCay = $request->idCay;
////        } else{
////            $treeImage->idCay = $tree_id;
////        }
//        $treeImage->idCay = $request->idCay;
//        $result = $treeImage->save();
//        if ($result) {
//            return ["Result" => "Data has been updated"];
//        } else {
//            return ["Result" => "Update operation has been failed"];
//        }
    }

    public function delete($request)
    {
        $listId = $request->input('ids');
        foreach ($listId as $id) {
            $treeImage = AnhCay::find($id);
            $result = $treeImage->delete();
        }
        if ($result) {
            return ["result" => "delete success"];
        } else {
            return ["result" => "delete error"];
        }
    }

    public function deleteByTreeId($id)
    {
        $result = DB::table('AnhCay')->where('AnhCay.idCay', '=', $id)->delete();
        if ($result) {
            return ["result" => "delete by foreign key success"];
        } else {
            return ["result" => "delete by foreign key error"];
        }
    }

    public function createByObject($request, $tree_id)
    {
        $treeImage = new AnhCay();
        $prefix = 'AC';
        $table = 'AnhCay';
        $id = Helper::auto_id($prefix, $table);
        $treeImage->id = $id;
        $treeImage->hinhAnh = $request['hinhAnh'];
        $treeImage->idCay = $tree_id;
        $result = $treeImage->save();
        if ($result) {
            return ["Result" => "Data has been saved"];
        } else {
            return ["Result" => "Operation failed"];
        }
    }

//    public function updateByObject($request, $tree_id){
//        $treeImage = AnhCay::find($request->id);
//        $treeImage->hinhAnh = $request->hinhAnh;
//        $treeImage->idCay = $request->idCay;
//        $treeImage->idCay = $tree_id;
//        $result = $treeImage->save();
//        if ($result){
//            return ["Result" => "Data has been updated"];
//        }
//        else
//        {
//            return ["Result" => "Update operation has been failed"];
//        }
//    }

}
