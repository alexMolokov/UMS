<?php
/**
 * Created by PhpStorm.
 * User: Анастасия
 * Date: 07.02.2019
 * Time: 10:45
 */

namespace App\Http\Middleware\Messenger;
use App\Interfaces\Handler as Handler;
use Illuminate\Http\Request;


abstract class AbstractHandler implements Handler
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

    public function handle(Request $request)
    {
        if ($this->nextHandler) {
            return $this->nextHandler->handle($request);
        }

        return new \EncryptServer\Response\SuccessResponse();
    }
}