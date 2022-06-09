<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class trouble extends Model
{
    use HasFactory;

    public function tree(){
        return $this->hasOne(tree::class, 'id', 'tree_id');
    }
}
