<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class staff_execute extends Model
{
    use HasFactory;

    public function work(){
        return $this->hasOne(work::class, 'id', 'work_id');
    }

    public function staff(){
        return $this->hasOne(staff::class, 'id', 'staff_id');
    }
}
