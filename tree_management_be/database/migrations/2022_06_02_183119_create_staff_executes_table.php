<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStaffExecutesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff_executes', function (Blueprint $table) {
            $table->unsignedBigInteger("work_id");
            $table->unsignedBigInteger("staff_id");
            $table->timestamps();
            $table->primary(['work_id', 'staff_id']);
            $table->foreign('work_id')->references('id')->on('works')
                ->onUpdate('restrict')
                ->onDelete('cascade');
            $table->foreign('staff_id')->references('id')->on('staffs')
                ->onUpdate('restrict')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('staff_executes');
    }
}
