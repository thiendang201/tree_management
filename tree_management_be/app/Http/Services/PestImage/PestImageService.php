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

        $pest_id = $request->idSauBenh;

        if (!$request->hasFile('hinhAnh')) {
            return response()->json(['upload_file_not_found'], 400);
        }

        $images = $request->file('hinhAnh');

        foreach ($images as $image) {
            $imageName = time() . rand(1, 1000) . '.' . $image->extension();
            $image->move(public_path('pest_image'), $imageName);

            //store image file into directory and db
            $save = new AnhSauBenh();
            $id = Helper::auto_id($prefix, $table);
//          $save->title = $name;
            $save->id = $id;
            $save->hinhAnh = '/pest_image/'.$imageName;
            $save->idSauBenh = $pest_id;
            $save->save();
        }
        return response()->json(['file_uploaded'], 200);

//        $id = Helper::auto_id($prefix, $table);
//        $pestImage->id = $id;
//        $pestImage->hinhAnh = $request->hinhAnh;
//        $pestImage->idSauBenh = $request->idSauBenh;
////        if ($pest_id==null) {
////            $pestImage->idSauBenh = $request->idSauBenh;
////        } else{
////            $pestImage->idSauBenh = $pest_id;
////        }
//        $result = $pestImage->save();
////        return $result;
//        if ($result){
//            return ["Result" => "Data has been saved"];
//        }
//        else
//        {
//            return ["Result" => "Operation failed"];
//        }
    }

    public function update($request){

        $pest_id = $request->idSauBenh;
        $deleted = $this->deleteByPestStatusId($pest_id);
        if ($deleted) {
            $created = $this->create($request);
            if ($created) {
                return response()->json(['file_updated'], 200);
            }
        }
        return response()->json(['file_update_fail'], 400);

//        $pestImage = AnhSauBenh::find($request->id);
//        $pestImage->hinhAnh = $request->hinhAnh;
//        $pestImage->idSauBenh = $request->idSauBenh;
////        if ($pest_id==null) {
////            $pestImage->idSauBenh = $request->idSauBenh;
////        } else{
////            $pestImage->idSauBenh = $pest_id;
////        }
//        $result = $pestImage->save();
//        if ($result){
//            return ["Result" => "Data has been updated"];
//        }
//        else
//        {
//            return ["Result" => "Update operation has been failed"];
//        }
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

    public function deleteByPestStatusId($id)
    {
        $result = DB::table('AnhSauBenh')->where('AnhSauBenh.idSauBenh', '=', $id)->delete();
        if ($result)
        {
            return ["result"=>"delete by foreign key success"];
        }
        else
        {
            return ["result"=>"delete by foreign key error"];
        }
    }

    public function createByObject($request, $pest_id){
        $pestImage = new AnhSauBenh();
        $prefix='ASB';
        $table='AnhSauBenh';
        $id = Helper::auto_id($prefix, $table);
        $pestImage->id = $id;
        $pestImage->hinhAnh = $request;
        $pestImage->idSauBenh = $pest_id;
        $result = $pestImage->save();
//        return $result;
        if ($result){
            return ["Result" => "Data has been saved"];
        }
        else
        {
            return ["Result" => "Operation failed"];
        }
    }
}
