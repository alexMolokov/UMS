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

class MessengerTree implements Tree
{
     private $facade;


    public function __construct($facade)
    {
        $this->facade = $facade;
    }

    public function getChildren($id) : array
    {
        $result = [];

        $children = $this->facade->getChildren($id);

        foreach($children as $child) {
            $result[] = [
                "id" => $child->getGuid(),
                "name" => $child->getName(),
                "parentId" => $child->getParent(),
                "hasChild" => true
            ];
        }

        return  $result;
    }


    public  function get(array $ids = []) : array
    {
        $result = [];

        foreach($ids as $id){
            $item = $this->facade->get($id);
            $result[] = [
                "id" => $item->getGuid(),
                "name" => $item->getName(),
                "parentId" => $item->getParent(),
                "hasChild" => true
            ];
        }

        return $result;
    }


    public function getPath(string $id) : array
    {
        $result = [];
        $path =  $this->facade->getPath($id);

        foreach($path as $item)
        {
            $result[] = ["name" => $item->getName(), "id" => $item->getGuid()];
        }

        return $result;
    }



}