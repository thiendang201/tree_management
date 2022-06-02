<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanTreesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plan_trees', function (Blueprint $table) {
            $table->unsignedBigInteger("tree_id");
            $table->unsignedBigInteger("plan_id");
            $table->timestamps();
            $table->primary(['tree_id', 'plan_id']);
            $table->foreign('tree_id')->references('id')->on('trees')
                ->onUpdate('restrict')
                ->onDelete('cascade');
            $table->foreign('plan_id')->references('id')->on('plans')
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
        Schema::dropIfExists('plan_trees');
    }
}
