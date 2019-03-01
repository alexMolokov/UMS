<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Permission;

class PermissionsGroup extends Model
{
    const MESSENGER = "messenger";
    const ADMIN = "admin";
    const ADMIN_ROLES = "role";
    const LOG = "log";
    const FEEDBACK = "feedback";

    protected $table = "permissions_groups";

    public static function getTitle($name) {
        $groups = [
            self::MESSENGER => "Messenger users",
            self::ADMIN => "System users",
            self::ADMIN_ROLES => "System roles",
            self::FEEDBACK => "Feedback",
            self::LOG => "Log"
        ];

        return $groups[$name];
    }

    public function permissions() {
        return $this->hasMany("App\Permission", "group_id");
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function allPermissions()
    {
        return Permission::with($this->table)->get();
    }
}
