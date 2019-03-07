<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrganizationUnitTables extends Migration
{

    const TABLE_OU = "organization_units";
    const TABLE_USER_ORGANIZATION = "user_organization_unit";
    const TABLE_USERS = "users";
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(self::TABLE_OU, function (Blueprint $table) {
            $table->uuid('id');
            $table->string('name', 100);
            $table->uuid('parent_id')->nullable();
            $table->boolean('has_child')->default(false);
            $table->timestamps();
            $table->primary('id');
        });

        Schema::create(self::TABLE_USER_ORGANIZATION, function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->uuid('organization_unit_id');

            $table->foreign('user_id')
                ->references('id')
                ->on(self::TABLE_USERS)
                ->onDelete('cascade');

            $table->foreign('organization_unit_id')
                ->references('id')
                ->on(self::TABLE_OU)
                ->onDelete('cascade');

            $table->primary(["user_id", "organization_unit_id"]);

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
        Schema::dropIfExists(self::TABLE_OU);
    }
}
