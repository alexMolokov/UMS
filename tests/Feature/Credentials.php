<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 18.02.2019
 * Time: 17:50
 */

namespace Tests\Feature;


class Credentials
{
        public static function getSuperAdmin() {
            return ["login" => "superAdmin", "password" => "_superAdmin"];
        }

        public static function getManager() {
            return ["login" => "manager", "password" => "gappManager"];
        }

        public static function getAdmin() {
            return ["login" => "admin", "password" => "gappAdmin"];
        }
}