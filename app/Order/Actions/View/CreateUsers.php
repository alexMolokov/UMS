<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 03.04.2019
 * Time: 16:55
 */
namespace App\Order\Actions\View;

use App\Order\Order;

class CreateUsers extends View implements IActionView
{
    public function info(Order $order ) : array {
        $data = (array) json_decode($order->data);
        return $data;
    }
}