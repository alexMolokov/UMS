<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 06.03.2019
 * Time: 17:15
 */

namespace App\OrganizationUnit;

interface Tree
{
    public function getChildren();
    public function getPath();

}