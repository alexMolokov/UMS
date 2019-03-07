<?php

namespace App;

use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{

    public function permissions()
    {
        return $this->belongsToMany(
            config('laravel-permission.models.permission'),
            config('laravel-permission.table_names.role_has_permissions')
        )->withPivot('approved');
    }


    public function removeAllPermissions()
    {
        $this->permissions()->detach();
    }


    public function setPermissions($permissions = [])
    {
        foreach($permissions as $permission)
        {
            $this->permissions()->attach($permission["id"], ["approved" => $permission["approved"]]);
        }
    }


}
