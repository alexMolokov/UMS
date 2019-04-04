<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 03.04.2019
 * Time: 16:58
 */

namespace App\Order\Actions\View;


use App\Order\Order;

interface IActionView
{
        public function info(Order $order) : array ;
}