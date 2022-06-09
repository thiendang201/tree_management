<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pest_status extends Model
{
    use HasFactory;

    public function pest_images(){
        return $this->hasMany(pest_image::class, "pest_id", "id");
    }
     public function tree(){
        return $this->hasOne(tree::class, "id", "tree_id");
     }
}
