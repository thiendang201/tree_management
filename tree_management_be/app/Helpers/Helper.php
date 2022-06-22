<?php

namespace App\Helpers;

use Illuminate\Support\Facades\DB;

class Helper
{
    public static function subStringId($id, $index)
    {
        return substr($id, $index);
    }

    public static function auto_id($prefix, $table)
    {
//        $stringId = DB::table($table)->orderByDesc('id')->pluck('id')[0];
//        $stringId = DB::table($table)->orderByDesc('created_at')->pluck('id')[0];
//        if ($stringId==null)
//        {
//            return $prefix.'1';
//        }
//        $maxId = substr($stringId, strlen($prefix))*1 ;
//        return $prefix.($maxId+1);
        $stringId = DB::table($table)->pluck('id');
        if ($stringId==null ||  count($stringId) == 0)
        {
            return $prefix.'1';
        }
        $lenPrefix = strlen($prefix);
        $idList = [];
        foreach ($stringId as $id)
        {
            array_push($idList, (int) substr($id, $lenPrefix));
        }
        return $prefix.(max($idList)+1);


    }
}
