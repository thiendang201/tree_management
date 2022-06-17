<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CayXanh extends Model
{
    use HasFactory;
    protected $table = 'CayXanh';

    public function AnhCays()
    {
        return $this->hasMany(AnhCay::class, 'idCay', 'id');
    }

    public function LoaiCay()
    {
        return $this->hasOne(LoaiCay::class, 'id', 'idLoaiCay');
    }
}
