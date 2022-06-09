<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class plan_tree extends Model
{
    use HasFactory;

    public function tree(){
        return $this->hasOne(tree::class, "id", "tree_id");
    }

    public function plan(){
        return $this->hasOne(plan::class, "id", "plan_id");
    }
}
