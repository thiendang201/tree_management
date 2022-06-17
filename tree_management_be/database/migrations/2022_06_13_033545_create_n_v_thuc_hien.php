<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNVThucHien extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('NVThucHien', function (Blueprint $table) {
            $table->string("idCV");
            $table->string("idNV");
            $table->timestamps();
            $table->primary(['idCV', 'idNV']);
            $table->foreign('idCV')->references('id')->on('CongViec');
            $table->foreign('idNV')->references('id')->on('NhanVien');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('NVThucHien');
    }
}
