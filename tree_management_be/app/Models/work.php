<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class work extends Model
{
    use HasFactory;

    public function plan(){
        return $this->hasOne(plan::class, 'id', 'plan_id');
    }
    public function staff_executes(){
        return $this->hasMany(staff_execute::class, "work_id", "id");
    }
}
