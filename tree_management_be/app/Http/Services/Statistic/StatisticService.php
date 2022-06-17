<?php

namespace App\Http\Services\Statistic;

use Illuminate\Support\Facades\DB;

class StatisticService
{
    protected $limit = 8;
    protected $fields_plan = array('KeHoach.*','NhanVien.tenNV as nhanVien');
    protected $fields_staff = array('KeHoach.id','NhanVien.tenNV as nhanVien');

    public function getAllTree($request)
    {
        return null;
    }

    public function getAllTrouble($request)
    {
        $year = (int) $request->input('year');
//        $status = $request->input('status');
        $query = DB::table('SuCo');
        if ($year!=null) {
            $query->where(DB::raw('year(created_at)'), '=', $year);
        }
        $result=$query->paginate(8);
        return $result;
    }

    public function getAllPlan($request)
    {
        $year = $request->input('year');
        $month = $request->input('month');
        $status = $request->input('status');
        $query = DB::table('KeHoach')
            ->join('NhanVien', 'NhanVien.id', 'KeHoach.idNVPhuTrach');
        if ($status!=null)
        {
            $query->where('KeHoach.trangThai', '=', $status);
        }
        if ($year!=null)
        {
            $query->where(DB::raw('year(KeHoach.ngayBatDau)'), '=', $year);
        }
        if ($month!=null)
        {
            $query->where(DB::raw('month(KeHoach.ngayBatDau)'), '=', $month);
        }
        $result=$query->paginate($this->limit, $this->fields_plan);
        return $result;
    }

    public function getStaffByPlanId($request)
    {
        $plan_id = $request->input('plan_id');
        $result = DB::table('NhanVien')
            ->join('NVThucHien', 'NVThucHien.idNV', 'NhanVien.id')
            ->join('CongViec', 'CongViec.id', 'NVThucHien.idCV')
            ->join('KeHoach', 'KeHoach.id', 'CongViec.idKeHoach')
            ->where('KeHoach.id', '=', $plan_id)
            ->paginate($this->limit, $this->fields_staff);
        return $result;
    }
}
