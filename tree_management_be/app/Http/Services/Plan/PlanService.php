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
    protected $limit = 8;
    protected $field_search = array('KeHoach.*');

    public function getAll(){
//        return KeHoach::all();
    return DB::table('KeHoach')->where('KeHoach.trangThai', '!=', 4)->get();
    }

    public function getById($id){
        //        $tree = CayXanh::find($id);
                $plan = DB::table('KeHoach')
                    ->where('KeHoach.id', '=', $id)->get();
                
                return $plan;
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
        $plan->idNVPhuTrach = $request->idNVPhuTrach;
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
        $DSCay=$request->DSCay;
        // foreach ($DSCay as $value) {
            $plan_tree=KeHoachCayXanh::where('idKeHoach',"=", $request->id);
            $plan_tree = $plan_tree->delete();

        //   }
          foreach ($DSCay as $value) {
            $plan_tree= new KeHoachCayXanh;
            $plan_tree->idCay = $value;
            $plan_tree->idKeHoach = $request->id;
            //return $plan_tree;
            $result = $plan_tree->save();

          }  

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
        $plan->trangthai="4";
        $result = $plan->save();
        if ($result)
        {
            return ["result"=>"delete success"];
        }
        else
        {
            return ["result"=>"delete error"];
        }
    }

    public function search($request){
        $plan_name = $request->input('tenKeHoach');
        $query = DB::table('KeHoach');

        if ($plan_name!=null)
                {
                    $query->where('tenKeHoach', 'like', "%".$plan_name."%");
                }

        $result=$query->paginate($this->limit, $this->field_search);
        return $result;
    }
    
}
