<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tree extends Model
{
    use HasFactory;

    public function tree_category(){
        return $this->hasOne(tree_category::class, 'id', 'tree_category_id');
    }

    public function tree_images(){
        return $this->hasMany(tree_image::class, "tree_id", "id");
    }

    public function pest_statuses(){
        return $this->hasMany(pest_status::class, "tree_id", "id");
    }

    public function troubles(){
        return $this->hasMany(trouble::class, "tree_id", "id");
    }
}
