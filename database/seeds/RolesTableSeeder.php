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
            "can_deleted" => '0'
        ]);


        $role = Role::create([
            "name" => "departmentAdmin"
        ]);

        Role::create([
            "name" => "organizationAdmin"
        ]);

    }
}
