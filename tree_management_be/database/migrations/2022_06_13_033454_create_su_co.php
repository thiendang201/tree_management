<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuCo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('SuCo', function (Blueprint $table) {
            $table->string("id");
            $table->primary(['id']);
            $table->string("tieuDe")->nullable();
            $table->string("loaiSuCo")->nullable();
            $table->longText("moTa")->nullable();
            $table->string("hinhAnh")->nullable();
//            $table->dateTime("")->nullable();
            $table->string('trangThai')->nullable();
            $table->string("idCay")->nullable();
            $table->timestamps();
            $table->foreign('idCay')->references('id')->on('CayXanh');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('SuCo');
    }
}
