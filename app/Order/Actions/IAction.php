<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 27.03.2019
 * Time: 16:03
 */

namespace App\Order\Actions;


interface IAction
{
    public function getData() : array ;
    public function getType();
    public function getSubject() : string ;

    public function execute();
}