<?php

namespace App\Http\Services\Statistic;

use Illuminate\Support\Facades\DB;

class StatisticService
{
    protected $limit = 8;
    protected $fields_plan = array('KeHoach.*','NhanVien.tenNV as nhanVien');
    protected $fields_staff = array('KeHoach.id','NhanVien.tenNV', 'hinhAnh');
    protected $fields_tree = array('CayXanh.*', 'LoaiCay.tenLoaiCay');

    public function getAllTree($request)
    {
        $status = $request->input('status');
        $position = $request->input('position');
        $age = $request->input('age');
        $tree_category = $request->input('tree_category');
//        return [
//            "status"=>$status,
//            "position"=>$position,
//            "age"=>$age,
//            "tree_category"=>$tree_category
//        ];
        $query = DB::table('CayXanh')
            ->join('LoaiCay', 'LoaiCay.id', 'CayXanh.idLoaiCay');
        if ($status==1)
        {
            $query->join('TinhTrangSauBenh', function ($join){
                $join->on('CayXanh.id', '=', 'TinhTrangSauBenh.idCay')
                    ->whereNull('TinhTrangSauBenh.ngayHet');
            });
        }
        if ($status==0 || $status==null)
        {
            $query->leftJoin('TinhTrangSauBenh', 'TinhTrangSauBenh.idCay', 'CayXanh.id');
        }
        if ($position!=null)
        {
            $query->where('CayXanh.viTri', 'like', '%'.$position.'%');
        }
        if ($age!=null)
        {
            $query->whereBetween(DB::raw('timestampdiff(YEAR, ngayTrong, date(now()))'), $age);
        }
        if ($tree_category!=null)
        {
            $query->where('CayXanh.idLoaiCay', '=', $tree_category);
        }
//        $query->where('CayXanh.viTri', 'like', '%'.$position.'%')
//            ->whereBetween(DB::raw('timestampdiff(YEAR, ngayTrong, date(now()))'), $age)
//            ->where('CayXanh.idLoaiCay', '=', $tree_category);
//        if ($status==null)
//        {
//            $query->leftJoin('TinhTrangSauBenh', 'TinhTrangSauBenh.idCay', 'CayXanh.id');
//        }
        if ($status==0 && $status!=null)
        {
            $query->whereNotIn('CayXanh.id', function ($q){
                $q->select('TinhTrangSauBenh.idCay')->from('TinhTrangSauBenh')->whereNull('TinhTrangSauBenh.ngayHet');
            })
                ->groupBy('CayXanh.id');
        }
        if ($status==1)
        {
            $result = $query->paginate($this->limit, array('CayXanh.*', 'LoaiCay.tenLoaiCay', DB::raw('true as biBenh')));
        }
        if ($status==0)
        {
            $result = $query->paginate($this->limit, array('CayXanh.*', 'LoaiCay.tenLoaiCay', DB::raw('false as biBenh')));
        }
        if ($status==null)
        {
            $query->groupBy('CayXanh.id');
            $result = $query->paginate($this->limit, array('CayXanh.*', 'LoaiCay.tenLoaiCay', DB::raw('if (TinhTrangSauBenh.ngayHet is null and count(TinhTrangSauBenh.id) > 0, true, false) as biBenh')));
        }
        return $result;
//        $query = DB::table('CayXanh')
//            ->join('LoaiCay', 'LoaiCay.id', 'CayXanh.idLoaiCay')
//            ->join('TinhTrangSauBenh', function ($join){
//                $join->on('CayXanh.id', '=', 'TinhTrangSauBenh.idCay')
//                    ->whereNull('TinhTrangSauBenh.ngayHet');
//            })
//            ->where('CayXanh.viTri', 'like', '%'.$position.'%')
//            ->whereBetween(DB::raw('timestampdiff(YEAR, ngayTrong, date(now()))'), $age)
//            ->where('CayXanh.idLoaiCay', '=', $tree_category);
//        $result = $query->paginate($this->limit, array('CayXanh.*', 'LoaiCay.tenLoaiCay', DB::raw('true as biBenh')));
//        $query = DB::table('CayXanh')
//            ->join('LoaiCay', 'LoaiCay.id', 'CayXanh.idLoaiCay')
//            ->leftJoin('TinhTrangSauBenh', 'TinhTrangSauBenh.idCay', 'CayXanh.id')
//            ->where('CayXanh.viTri', 'like', '%'.$position.'%')
//            ->whereBetween(DB::raw('timestampdiff(YEAR, ngayTrong, date(now()))'), $age)
//            ->where('CayXanh.idLoaiCay', '=', $tree_category)
//            ->whereNotIn('CayXanh.id', function ($q){
//                $q->select('TinhTrangSauBenh.idCay')->from('TinhTrangSauBenh')->whereNull('TinhTrangSauBenh.ngayHet');
//            })
//            ->groupBy('CayXanh.id');
//        $result = $query->paginate($this->limit, array('CayXanh.*', 'LoaiCay.tenLoaiCay', DB::raw('false as biBenh')));
//        return $result;
    }

    public function getAllTrouble($request)
    {
        $year = (int) $request->input('year');
//        $status = $request->input('status');
        $query = DB::table('SuCo')->join('CayXanh', 'CayXanh.id', 'SuCo.idCay');;
        if ($year!=null) {
            $query->where(DB::raw('year(SuCo.created_at)'), '=', $year);
        }
        $result=$query->paginate($this->limit, array('SuCo.id', 'tieuDe', 'moTa', 'SuCo.created_at', 'CayXanh.viTri'));
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
//        $result->items->staffs=$this->getStaffByPlanId($result->items->id);
        foreach ($result as $item){
            $item->staffs=$this->getStaffByPlanId($item->id);
        }
//        return $result->items()[1]->id;
        return $result;
    }

    public function getStaffByPlan($request)
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

    public function getStaffByPlanId($plan_id)
    {
        $result = DB::table('NhanVien')
            ->join('NVThucHien', 'NVThucHien.idNV', 'NhanVien.id')
            ->join('CongViec', 'CongViec.id', 'NVThucHien.idCV')
            ->join('KeHoach', 'KeHoach.id', 'CongViec.idKeHoach')
            ->where('KeHoach.id', '=', $plan_id)
            ->paginate($this->limit, $this->fields_staff);
        return $result->items();
    }
}
