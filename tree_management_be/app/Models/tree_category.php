<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tree_category extends Model
{
    use HasFactory;

    public function trees(){
        return $this->hasMany(tree::class, "tree_category_id", "id");
    }
}
