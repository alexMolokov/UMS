<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateUsersTable extends Migration
{
    const TABLE = "users";
    const TABLE_USER_ORGANIZATION = "user_organization_unit";
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create(self::TABLE, function (Blueprint $table) {
            $table->increments('id');
            $table->string('login', 30)->unique();
            $table->string('password');
            $table->string('firstname', 30)->nullable();
            $table->string('lastname', 30)->nullable();
            $table->string('email', 30)->nullable();
            $table->string('phone', 30)->nullable();
            $table->string('position', 30)->nullable();
            $table->boolean('blocked')->default('0')->comment("0-нет, 1- да");

            $table->date('date_from')->nullable()->comment("Дата с которого действует запись");
            $table->date('date_to')->default("2200-01-01")->comment("Дата до которой действует запись");

            $table->rememberToken();
            $table->integer('modified_by')->nullable();
            $table->integer('created_by')->nullable();
            $table->timestamps();
        });

        Schema::create(self::TABLE_USER_ORGANIZATION, function (Blueprint $table) {
            $table->integer('user_id');
            $table->uuid('organization_id')->nullable();
            $table->primary(["user_id", "organization_id"]);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists(self::TABLE_USER_ORGANIZATION);
        Schema::dropIfExists(self::TABLE);
    }
}
