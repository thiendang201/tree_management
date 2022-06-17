<?php

namespace App\Http\Services\Plan;

use App\Models\KeHoach;
use Illuminate\Support\Facades\DB;
use App\Helpers\Helper;

class PlanService
{
    public function getAll(){
//        return KeHoach::all();
    return DB::table('KeHoach')->get();
    }

    public function create($request){
        $plan = new KeHoach;
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
