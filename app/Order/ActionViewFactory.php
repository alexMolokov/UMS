<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 28.02.2019
 * Time: 15:00
 */

namespace App\Order;


class ActionViewFactory
{

    public static function create($viewId) {

        $views = [
            ActionFactory::BLOCK => "App\Order\Actions\View\Block",
            ActionFactory::CHANGE_PROFILE => "App\Order\Actions\View\ChangeProfile",
            ActionFactory::CHANGE_PASSWORD => "App\Order\Actions\View\ChangePassword",
            ActionFactory::CREATE_USER => "App\Order\Actions\View\CreateUser"
        ];

        $class = $views[$viewId];
        $view = new $class();

        return $view;
    }

}