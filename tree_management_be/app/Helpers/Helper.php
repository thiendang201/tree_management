<?php

namespace App\Helpers;

use Illuminate\Support\Facades\DB;

class Helper
{
    public static function auto_id($prefix, $table)
    {
        $stringId = DB::table($table)->orderByDesc('id')->pluck('id')[0];
        if ($stringId==null)
        {
            return $prefix.'1';
        }
        $maxId = substr($stringId, strlen($prefix))*1 ;
        return $prefix.($maxId+1);
    }
}
