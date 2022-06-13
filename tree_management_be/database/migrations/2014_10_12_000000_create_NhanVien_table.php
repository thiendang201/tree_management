<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNhanVienTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('NhanVien', function (Blueprint $table) {
            $table->id();
            $table->string('tenNV')->nullable();
            $table->string("hinhAnh")->nullable();
            $table->string("CCCD")->nullable();
            $table->date("ngaySinh")->nullable();
            $table->string("SDT")->nullable();
            $table->string('email')->unique();
            $table->string("diaChi")->nullable();
            $table->string("gioiTinh")->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('NhanVien');
    }
}
