<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateNhanVien extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('NhanVien', function (Blueprint $table){
            $table->string('trangThai')->nullable();
            $table->unsignedBigInteger('idQuyen')->nullable();
            $table->foreign('idQuyen')->references('id')->on('Quyen');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
