<?php
/**
 * Created by PhpStorm.
 * User: Анастасия
 * Date: 07.02.2019
 * Time: 10:54
 */

namespace App\Http\Middleware\Messenger;


use Illuminate\Http\Request;

class UserProfileHandler extends MessengerHandler
{
    public function handle(\stdClass $obj)
    {


        $response = $this->service->setUserProfile($obj->login, [
            "firstName" => $obj->firstname,
            "lastName" => $obj->lastname,
            "middleName" => $obj->middlename,
            "nickName" => $obj->nickname
        ]);

        if($response->getStatus()) return parent::handle($obj);
        return $response;
    }
}