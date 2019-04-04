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
    const BLOCK = "block";
    const CHANGE_PROFILE = "change_profile";

    public static function create(Request $request) {
        $actionId = $request->input("action");

        $actions = [
            self::BLOCK => "App\Order\Actions\Block",
            self::CHANGE_PROFILE => "App\Order\Actions\ChangeProfile",
        ];

        $class = $actions[$actionId];
        $action = new $class($request);
        $action->attach(new LogActionListener(), "*");

        return $action;
    }

}