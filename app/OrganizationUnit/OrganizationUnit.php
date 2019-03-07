<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 06.03.2019
 * Time: 17:18
 */

namespace App\OrganizationUnit;

use Illuminate\Database\Eloquent\Model;

class OrganizationUnit extends Model
{

    protected $fillable = ['id', 'name', 'parent_id', 'has_child'];


}