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
            "id" => State::APPROVE,
            "name" => State::getName(State::APPROVE),
            "title" => State::getName(State::APPROVE),
        ]);

        State::create([
            "id" => State::CANCEL,
            "name" => State::getName(State::CANCEL),
            "title" => State::getName(State::CANCEL),
        ]);

        State::create([
            "id" => State::REJECT,
            "name" => State::getName(State::REJECT),
            "title" => State::getName(State::REJECT),
        ]);

        State::create([
            "id" => State::DONE,
            "name" => State::getName(State::DONE),
            "title" => State::getName(State::DONE),
        ]);


    }
}
