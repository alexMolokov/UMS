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

class Block extends View implements IActionView
{
    public function info(Order $order ) : array {
            $data = json_decode($order->data);
            $login = $data->login;

            $service = $this->getUserService();
            $result = $service->getUserProfile($login);

            if($result->getStatus())
            {
               return $result->getResponse();
            }

            return [];
    }




}