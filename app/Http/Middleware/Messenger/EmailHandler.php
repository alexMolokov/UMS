<?php
/**
 * Created by PhpStorm.
 * User: Анастасия
 * Date: 07.02.2019
 * Time: 10:54
 */

namespace App\Http\Middleware\Messenger;


class EmailHandler extends MessengerHandler
{
    public function handle(\stdClass $obj)
    {
        $response = $this->service->setEmail($obj->login, $obj->email);

        if($response->getStatus()) return parent::handle($obj);
        return $response;
    }
}