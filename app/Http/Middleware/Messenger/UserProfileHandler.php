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
    public function handle(Request $request)
    {
        $data = $request->only('firstname', 'lastname', 'middlename', 'nickname', "login");

        $response = $this->service->setUserProfile($data["login"], [
            "firstName" => $data["firstname"],
            "lastName" => $data["lastname"],
            "middleName" => $data["middlename"],
            "nickName" => $data["nickname"]
        ]);

        if($response->getStatus()) return parent::handle($request);
        return $response;
    }
}