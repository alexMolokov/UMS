<?php
/**
 * Created by PhpStorm.
 * User: Анастасия
 * Date: 07.02.2019
 * Time: 10:54
 */

namespace App\Http\Middleware\Messenger;


use Illuminate\Http\Request;

class BlockHandler extends MessengerHandler
{
    public function handle(Request $request)
    {
        $login = $request->input("login");
        $blocked = $request->input("blocked");
        $response = $this->service->block($login, $blocked);

        if($response->getStatus()) return parent::handle($request);
        return $response;
    }
}