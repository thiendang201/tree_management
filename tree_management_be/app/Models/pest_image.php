<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pest_image extends Model
{
    use HasFactory;

    public function pest_status(){
        return $this->hasOne(pest_status::class, "id", "pest_id");
    }
}
