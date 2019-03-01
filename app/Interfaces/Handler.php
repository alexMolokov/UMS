<?php
/**
 * Created by PhpStorm.
 * User: Анастасия
 * Date: 07.02.2019
 * Time: 10:50
 */
namespace App\Interfaces;

use Illuminate\Http\Request;

interface Handler
{
    public function setNext(Handler $handler);
    public function handle(Request $request);
}