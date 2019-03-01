<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderTables extends Migration
{
    const TABLE_ORDER = "orders";
    const TABLE_STATE = "order_states";

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(self::TABLE_STATE, function (Blueprint $table) {
            $table->integer('id');
            $table->string('name', 20);
            $table->string('title', 50);
            $table->primary('id');
        });


        Schema::create(self::TABLE_ORDER, function (Blueprint $table) {
            $table->increments('id');
            $table->string('subject', 150);
            $table->integer('order_state_id');
            $table->json('data');

            $table->boolean('can_handle');
            $table->integer('modified_by')->unsigned();
            $table->integer('created_by')->unsigned();

            $table->timestamps();

            $table->foreign('order_state_id')
                ->references('id')
                ->on(self::TABLE_STATE);
        } );

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists(self::TABLE_ORDER);
        Schema::dropIfExists(self::TABLE_STATE);
    }
}
