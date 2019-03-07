<?php

use Illuminate\Database\Seeder;
use App\OrganizationUnit\OrganizationUnit;

class OrganizationUnitTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        OrganizationUnit::create([
             "id" => "5c6fc5d49b561f606be90bcf",
             "name" => "TD1",
             "parent_id" => null,
             "has_child" => true
         ]);

        OrganizationUnit::create([
            "id" => "5c6fcf14ba44a8ea066f295f",
            "name" => "Кошки Лукошки",
            "parent_id" => "5c6fc5d49b561f606be90bcf",
            "has_child" => true
        ]);

        OrganizationUnit::create([
            "id" => "5c6fcf2dba44a8ea066f2967",
            "name" => "Бухгалтерия",
            "parent_id" => "5c6fcf14ba44a8ea066f295f",
        ]);

        OrganizationUnit::create([
            "id" => "5c6fcf38ba44a8ea066f296f",
            "name" => "Финансы",
            "parent_id" => "5c6fcf14ba44a8ea066f295f",
        ]);

        OrganizationUnit::create([
            "id" => "5c6fcf47ba44a8ea066f2977",
            "name" => "IT",
            "parent_id" => "5c6fcf14ba44a8ea066f295f",
        ]);


        OrganizationUnit::create([
            "id" => "5c6fc5d49b561f606be90bd0",
            "name" => "TD2",
            "parent_id" => null

        ]);
    }


}
