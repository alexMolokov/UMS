<?php
/**
 * Created by PhpStorm.
 * User: Анастасия
 * Date: 07.02.2019
 * Time: 10:50
 */
namespace App\Interfaces;

use Illuminate\Http\Request;

interface MessengerHandler
{
    public function setNext(MessengerHandler $handler);
    public function handle(\stdClass $obj);
}