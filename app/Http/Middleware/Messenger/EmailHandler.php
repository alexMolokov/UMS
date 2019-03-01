<?php
/**
 * Created by PhpStorm.
 * User: Анастасия
 * Date: 07.02.2019
 * Time: 10:54
 */

namespace App\Http\Middleware\Messenger;


use Illuminate\Http\Request;

class EmailHandler extends MessengerHandler
{
    public function handle(Request $request)
    {
        $login = $request->input("login");
        $email = $request->input("email");
        $response = $this->service->setEmail($login, $email);

        if($response->getStatus()) return parent::handle($request);
        return $response;
    }
}