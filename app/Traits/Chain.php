<?php
/**
 * Created by PhpStorm.
 * User: Анастасия
 * Date: 07.02.2019
 * Time: 10:45
 */

namespace App\Traits;
use App\Interfaces\Handler as Handler;
use Illuminate\Http\Request;


trait Chain
{
    /**
     * @var Handler
     */
    private $nextHandler;

    /**
     * @param Handler $handler
     * @return Handler
     */
    public function setNext(Handler $handler)
    {
        $this->nextHandler = $handler;
        return $handler;
    }


}