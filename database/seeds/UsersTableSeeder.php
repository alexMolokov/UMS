<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Permission;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            "login" => "superAdmin",
            "password" => bcrypt("_superAdmin")
        ]);
        $user->assignRole('superAdmin');

        $user = User::create([
            "login" => "departmentAdmin",
            "password" => bcrypt( "_departmentAdmin")
        ]);
        $user->assignRole('departmentAdmin');

        $user = User::create([
            "login" => "organizationAdmin",
            "password" => bcrypt( "_organizationAdmin")
        ]);
        $user->assignRole('organizationAdmin');


    }
}
