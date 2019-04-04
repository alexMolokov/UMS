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

class View
{

    protected function getUserService()
    {
        return  resolve("EncryptServer\Interfaces\IUserInterface");
    }

    protected function getUnitService()
    {
        return  resolve("EncryptServer\Interfaces\IOrganizationUnit");
    }


}