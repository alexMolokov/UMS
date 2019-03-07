<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Permission;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            "name" => "superAdmin",
            "is_editable" => '0',
            "description" => "Администратор Системы"
        ]);

        Role::create([
            "name" => "operatorAdmin",
            "description" => "Администратор Оператора"
        ]);

        Role::create([
            "name" => "departmentAdmin",
            "description" => "Администратор Департамента"
        ]);

        Role::create([
            "name" => "organizationAdmin",
            "description" => "Администратор Организации"
        ]);

    }
}
