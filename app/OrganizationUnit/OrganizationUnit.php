<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 06.03.2019
 * Time: 17:18
 */

namespace App\OrganizationUnit;

use App\User;
use Illuminate\Database\Eloquent\Model;

class OrganizationUnit extends Model
{
    public $incrementing = false;

    protected $fillable = ['id', 'name', 'parent_id', 'has_child'];


    public function users()
    {
        return $this->belongsToMany(
            User::class,
            'user_organization_unit'
        );
    }

}