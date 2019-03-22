<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

use App\OrganizationUnit\OrganizationUnit;
use App\Role;

class User extends Authenticatable
{
    use Notifiable;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname', 'lastname', 'email', 'login', 'password', 'blocked', 'position', 'date_from', 'date_to'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'created_at', 'updated_at'
    ];


    public static function getPasswordHash($password)
    {
        return bcrypt($password);
    }

    public function organizationUnits()
    {
        return $this->belongsToMany(
           OrganizationUnit::class,
           'user_organization_unit'
        );
    }

    public function isSuperAdmin() {
        return $this->hasRole(Role::SUPER_ADMIN);
    }

}
