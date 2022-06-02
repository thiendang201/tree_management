<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTreeCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tree_categories', function (Blueprint $table) {
            $table->id();
            $table->string("name")->nullable();
            $table->string("roots_type")->nullable();
            $table->string("trunk_type")->nullable();
            $table->string("leaf_type")->nullable();
            $table->longText("description")->nullable();
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
        Schema::dropIfExists('tree_categories');
    }
}
