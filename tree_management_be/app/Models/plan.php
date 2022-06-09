<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class plan extends Model
{
    use HasFactory;

    public function staff(){
        return $this->hasOne(staff::class, "id", "staff_manager_id");
    }

    public function works(){
        return $this->hasMany(work::class, "plan_id", "id");
    }

    public function plan_trees(){
        return $this->hasMany(plan_tree::class, "plan_id", "id");
    }
}
