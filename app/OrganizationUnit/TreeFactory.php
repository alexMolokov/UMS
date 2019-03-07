<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 07.03.2019
 * Time: 12:29
 */

namespace App\OrganizationUnit;


class TreeFactory
{
        public static function create($id) {
            return new MessengerTree($id);
        }
}