<?php
/**
 * Created by PhpStorm.
 * User: Анастасия
 * Date: 07.02.2019
 * Time: 10:53
 */

namespace App\Http\Middleware\Messenger;


class MessengerHandler extends AbstractHandler
{
        protected $service;

        public function __construct($service)
        {
            $this->service = $service;
        }
}