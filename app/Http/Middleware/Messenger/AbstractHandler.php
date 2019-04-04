<?php
/**
 * Created by PhpStorm.
 * User: Анастасия
 * Date: 07.02.2019
 * Time: 10:45
 */

namespace App\Http\Middleware\Messenger;
use App\Interfaces\MessengerHandler;
use Illuminate\Http\Request;


abstract class AbstractHandler implements MessengerHandler
{
    /**
     * @var Handler
     */
    private $nextHandler;

    /**
     * @param Handler $handler
     * @return Handler
     */
    public function setNext(MessengerHandler $handler)
    {
        $this->nextHandler = $handler;
        return $handler;
    }

    public function handle(\stdClass $obj)
    {
        if ($this->nextHandler) {
            return $this->nextHandler->handle($obj);
        }

        return new \EncryptServer\Response\SuccessResponse();
    }
}