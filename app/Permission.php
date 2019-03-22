<?php

namespace App;

use Spatie\Permission\Models\Permission as SpatiePermission;

class Permission extends SpatiePermission
{
    const MESSENGER_WATCH_USER = "messenger.watch.user";
    const MESSENGER_BLOCK_USER = "messenger.block.user";
    //const MESSENGER_CREATE_USER = "messenger.create.user";
    const MESSENGER_EDIT_USER = "messenger.edit.user";
    //const MESSENGER_CREATE_STRUCTURE = "messenger.create.structure";
    const MESSENGER_EDIT_STRUCTURE = "messenger.edit.structure";
    const MESSENGER_MOVE_USER = "messenger.move.user";
    const MESSENGER_COPY_USER = "messenger.copy.user";
    //const MESSENGER_SMS_SEND = "messenger.sms.send";

    const FEEDBACK = "feedback";

    const ADMIN_WATCH_USER = "admin.watch.user";
    const ADMIN_CREATE_USER = "admin.create.user";
    const ADMIN_EDIT_USER = "admin.edit.user";
    const ADMIN_BLOCK_USER = "admin.block.user";
    const ADMIN_WATCH_ROLE = "admin.watch.role";
    const ADMIN_CREATE_ROLE = "admin.create.role";
    const ADMIN_EDIT_ROLE = "admin.edit.role";
    const ADMIN_DELETE_ROLE = "admin.delete.role";

    const LOG_WATCH = "log.watch";

    /**
     * @param string $name
     * @return string
     */
    public static function getTitle($name) {
        $permissions = [
            self::MESSENGER_WATCH_USER => "Watch user",
            self::MESSENGER_BLOCK_USER => "Block user",
            //self::MESSENGER_SMS_SEND => "Send sms",
            //self::MESSENGER_CREATE_USER => "Create users",
            self::MESSENGER_EDIT_USER => "Edit user",
            //self::MESSENGER_CREATE_STRUCTURE => "Create structure",
            self::MESSENGER_EDIT_STRUCTURE => "Edit structure",
            self::MESSENGER_MOVE_USER => "Move users",
            self::MESSENGER_COPY_USER => "Copy users",

            self::FEEDBACK => "Feedback",

            self::ADMIN_WATCH_USER => "Watch user",
            self::ADMIN_CREATE_USER => "Create user",
            self::ADMIN_EDIT_USER => "Edit user",
            self::ADMIN_BLOCK_USER => "Block user",

            self::ADMIN_WATCH_ROLE => "Watch role",
            self::ADMIN_CREATE_ROLE => "Create role",
            self::ADMIN_EDIT_ROLE => "Edit role",
            self::ADMIN_DELETE_ROLE => "Delete role",

            self::LOG_WATCH => "Watch log"
        ];

        if(!isset($permissions[$name])) {
            throw new \InvalidArgumentException("Invalid Permission {$name}");
        }

        return $permissions[$name];
    }


    public function roles()
    {
        return $this->belongsToMany(
            config('laravel-permission.models.role'),
            config('laravel-permission.table_names.role_has_permissions')
        )->withPivot('approved');
    }
}
