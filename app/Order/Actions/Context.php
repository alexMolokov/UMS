<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 03.04.2019
 * Time: 14:30
 */

namespace App\Order\Actions;


class Context
{
    public static function handle(string $action, \stdClass $data) : string
    {
        $name = "action_" . strtolower($action);

        if(method_exists('App\Order\Actions\Context', $name)) {
            return self::$name($data);
        }
        return "";
    }

    public static function action_block($data)
    {
            return __("Login") . ": " . $data->login;
    }

    public static function action_change_profile($data)
    {
        $login = __("Login") . ": " . $data->login;
        $fullName = self::fullName($data);


        return $login . ((empty($fullName))? "" : ", " .  __("Full name") . ": " . $fullName);
    }

    private static function fullName($data)
    {
        $result = "";
        $fields = ["lastname", "firstname", "middlename"];
        foreach($fields as $field)
        {
            $result .= trim($data->{$field}) . " ";
        }
        return trim($result);
    }
}