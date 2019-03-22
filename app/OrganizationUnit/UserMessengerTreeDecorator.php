<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 06.03.2019
 * Time: 17:21
 */


namespace App\OrganizationUnit;
use App\OrganizationUnit\OrganizationUnit;

use App\User;
use EncryptServer\OrganizationUnitFacade;

class UserMessengerTreeDecorator implements Tree
{
     private $tree;
     private $ids = [];


    public function __construct(Tree $tree)
    {
        $this->tree = $tree;
    }

    public function setIds($ids = []) {
        $this->ids = $ids;
    }

    public function getChildren($id): array
    {
        if(is_null($id))
            return $this->get($this->ids);

        return $this->tree->getChildren($id);
    }


    public  function get(array $ids = []): array
    {
        return $this->tree->get($ids);
    }


    public function getPath(string $id): array
    {
        return $this->tree->getPath($id);
    }



}