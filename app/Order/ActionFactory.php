<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 28.02.2019
 * Time: 15:00
 */

namespace App\Order;

use App\Order\Actions\Listeners\LogActionListener;
use Illuminate\Http\Request;


class ActionFactory
{
    const BLOCK = "messenger.user.block";
    const CHANGE_PROFILE = "messenger.change.profile";
    const CHANGE_PASSWORD = "messenger.user.change.password";
    const CREATE_USER = "messenger.user.create";


    public static function create(Request $request) {
        $actionId = $request->input("action");

        $actions = [
            self::BLOCK => "App\Order\Actions\Block",
            self::CHANGE_PROFILE => "App\Order\Actions\ChangeProfile",
            self::CHANGE_PASSWORD => "App\Order\Actions\ChangePassword",
            self::CREATE_USER => "App\Order\Actions\CreateUser",
        ];

        $class = $actions[$actionId];
        $action = new $class($request);
        $action->attach(new LogActionListener(), "*");

        return $action;
    }

}