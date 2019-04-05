<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderTables extends Migration
{
    const TABLE_ORDER = "orders";
    const TABLE_STATE = "order_states";

    const TABLE_USERS = "users";

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
            $table->string('subject', 200);
            $table->string('action', 50);
            $table->integer('order_state_id');

            $table->json('data');

            $table->integer('modified_by')->unsigned()->nullable();
            $table->integer('created_by')->unsigned();

            $table->string('modified_by_login', 20)->nullable();
            $table->string('created_by_login', 20);

            $table->integer('assigned_by')->unsigned()->nullable();

            $table->timestamps();

            $table->foreign('order_state_id')
                ->references('id')
                ->on(self::TABLE_STATE);

            $table->foreign('created_by')
                ->references('id')
                ->on(self::TABLE_USERS);

            $table->foreign('assigned_by')
                ->references('id')
                ->on(self::TABLE_USERS);

            $table->foreign('modified_by')
                ->references('id')
                ->on(self::TABLE_USERS);

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
