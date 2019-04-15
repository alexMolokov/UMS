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
        $name = "action_" . str_replace(".", "_", strtolower($action));

        if(method_exists('App\Order\Actions\Context', $name)) {
            return self::$name($data);
        }
        return "";
    }

    public static function action_messenger_user_block($data)
    {
            return __("Login") . ": " . $data->login;
    }

    public static function action_messenger_user_change_password($data)
    {
        return self::action_messenger_user_block($data);
    }

    public static function action_messenger_change_profile($data)
    {
        $login = __("Login") . ": " . $data->login;
        $fullName = self::fullName($data);


        return $login . ((empty($fullName))? "" : ", " .  __("Full name") . ": " . $fullName);
    }

    public static function action_messenger_user_create($data)
    {
        return self::action_messenger_change_profile($data);
    }

    public static function action_messenger_users_create($data){
        $result = "";
        $users = (array) $data->users;
        foreach($users as $user) {
            $result = self::action_messenger_change_profile($user);
            break;
        }

        return $result . "...";
    }

    public static function action_messenger_user_copy($data)
    {
        return __("Copy to") . ": " .  implode("\\", $data->ou_path) . ", " . __("users") . ": " .  implode(",", $data->users);
    }

    public static function action_messenger_user_move($data)
    {
        return __("Move to") . ": " .  implode("\\", $data->ou_path) . ", " . __("users") . ": " .  implode(",", $data->users);
    }


    private static function fullName($data)
    {
        $result = "";
        $fields = ["lastName", "firstName", "middleName"];
        foreach($fields as $field)
        {
            if(property_exists($data, $field)){
                $result .= trim($data->{$field}) . " ";
            }
        }
        return trim($result);
    }
}