<?php

use Illuminate\Database\Seeder;
use App\Order\State;

class OrderTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        State::create([
            "id" => State::FRESH,
            "name" => State::getName(State::FRESH),
        ]);

        State::create([
            "id" => State::APPROVE,
            "name" => State::getName(State::APPROVE),
        ]);

        State::create([
            "id" => State::CANCEL,
            "name" => State::getName(State::CANCEL),
        ]);

        State::create([
            "id" => State::FRESH,
            "name" => State::getName(State::FRESH),
        ]);


    }
}
