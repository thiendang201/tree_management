<?php

namespace App\Http\Services\Plan;

use App\Models\KeHoach;
use App\Models\KeHoachCayXanh;
use App\Models\CongViec;
use App\Models\NhanVienThucHien;
use Illuminate\Support\Facades\DB;
use App\Helpers\Helper;
use App\Models\NVThucHien;

class PlanService
{
    public function getAll(){
//        return KeHoach::all();
    return DB::table('KeHoach')->get();
    }

    public function create($request){
        $plan = new KeHoach;
        $prefix='KH';
        $table='KeHoach';
        $id = Helper::auto_id($prefix, $table);
        $plan->id = $id;
        $plan->tenKeHoach = $request->tenKeHoach;
        $plan->moTa = $request->moTa;
        $plan->diaDiem = $request->diaDiem;
        $plan->ngayBatDau = $request->ngayBatDau;
        $plan->ngayKetThuc = $request->ngayKetThuc;
        $plan->doUuTien = $request->doUuTien;
        $plan->IdNVPhuTrach = $request->IdNVPhuTrach;
        $plan->trangThai = $request->trangThai;

        $DSCay = $request->DSCay;
        $DSCongViec = $request->DSCongViec;
    
        $result = $plan->save();
        
        foreach($DSCongViec as $value){
            $work = new CongViec;
            $idCV = Helper::auto_id('CV', 'congviec');
            $work->id = $idCV;
            $work->tenCV = $value['tenCV'];
            $work->ngayBatDau = $value['ngayBatDau'];
            $work->ngayKetThuc = $value['ngayKetThuc'];
            $work->idKeHoach = $id;
            $DSNhanVien = $value['DSNhanVien'];
            $result = $work->save();
            foreach ($DSNhanVien as $nv) {
                $plan_employ= new NhanVienThucHien;
                $plan_employ->idNV = $nv;
                $plan_employ->idCV = $idCV;
                $result = $plan_employ->save();
    
              } 
        }



        foreach ($DSCay as $value) {
            $plan_tree= new KeHoachCayXanh;
            $plan_tree->idCay = $value;
            $plan_tree->idKeHoach = $id;
            $result = $plan_tree->save();

          } 
        
        
        if ($result){
            return ["Result" => "Data has been saved"];
        }
        else
        {
            return ["Result" => "Operation failed"];
        }
    }

    public function update($request){
        $plan = KeHoach::find($request->id);
        $plan->tenKeHoach = $request->tenKeHoach;
        $plan->moTa = $request->moTa;
        $plan->diaDiem = $request->diaDiem;
        $plan->ngayBatDau = $request->ngayBatDau;
        $plan->ngayKetThuc = $request->ngayKetThuc;
        $plan->doUuTien = $request->doUuTien;
        $plan->IdNVPhuTrach = $request->IdNVPhuTrach;
        $plan->trangThai = $request->trangThai;
        $result = $plan->save();
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

        $plan = KeHoach::find($id);
        $result = $plan->delete();
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