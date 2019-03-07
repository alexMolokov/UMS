<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePermissionTables extends Migration
{

    private function _getTablesNames()
    {
        $tableNames = config('laravel-permission.table_names');
        $tableNames["permissions_groups"] = "permissions_groups";
        $tableNames["organization_unit"] = "organization_unit";
        return  $tableNames;
    }

    private function _getForeignKeys()
    {
        $foreignKeys = config('laravel-permission.foreign_keys');
        $foreignKeys["permissions_groups"] = "group_id";
        return $foreignKeys;
    }

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $tableNames = $this->_getTablesNames();
        $foreignKeys = $this->_getForeignKeys();


        Schema::create($tableNames['roles'], function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('description', 100)->nullable();
            $table->boolean('is_editable')->default('1')->comment("Может ли быть отредактирована");
            $table->timestamps();
        });

        Schema::create($tableNames["permissions_groups"], function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('title')->unique();
            $table->timestamps();
        });

        Schema::create($tableNames['permissions'], function (Blueprint $table)  use ($tableNames, $foreignKeys) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('title');
            $table->integer('group_id')->unsigned();
            $table->boolean('is_approved')->default(0);
            $table->timestamps();

            $table->foreign($foreignKeys["permissions_groups"])
                ->references('id')
                ->on($tableNames["permissions_groups"])
                ->onDelete('cascade');
        });

        Schema::create($tableNames['user_has_permissions'], function (Blueprint $table) use ($tableNames, $foreignKeys) {
            $table->integer($foreignKeys['users'])->unsigned();
            $table->integer('permission_id')->unsigned();

            $table->foreign($foreignKeys['users'])
                ->references('id')
                ->on($tableNames['users'])
                ->onDelete('cascade');

            $table->foreign('permission_id')
                ->references('id')
                ->on($tableNames['permissions'])
                ->onDelete('cascade');

            $table->primary([$foreignKeys['users'], 'permission_id']);
        });

        Schema::create($tableNames['user_has_roles'], function (Blueprint $table) use ($tableNames, $foreignKeys) {
            $table->integer('role_id')->unsigned();
            $table->integer($foreignKeys['users'])->unsigned();

            $table->foreign('role_id')
                ->references('id')
                ->on($tableNames['roles'])
                ->onDelete('cascade');

            $table->foreign($foreignKeys['users'])
                ->references('id')
                ->on($tableNames['users'])
                ->onDelete('cascade');

            $table->primary(['role_id', $foreignKeys['users']]);
        });

        Schema::create($tableNames['role_has_permissions'], function (Blueprint $table) use ($tableNames) {
            $table->integer('permission_id')->unsigned();
            $table->integer('role_id')->unsigned();
            $table->boolean('approved');

            $table->foreign('permission_id')
                ->references('id')
                ->on($tableNames['permissions'])
                ->onDelete('cascade');

            $table->foreign('role_id')
                ->references('id')
                ->on($tableNames['roles'])
                ->onDelete('cascade');

            $table->primary(['permission_id', 'role_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $tableNames = $this->_getTablesNames();

        Schema::drop($tableNames['role_has_permissions']);
        Schema::drop($tableNames['user_has_roles']);
        Schema::drop($tableNames['user_has_permissions']);
        Schema::drop($tableNames['roles']);
        Schema::drop($tableNames['permissions']);
        Schema::drop($tableNames['permissions_groups']);
    }
}
