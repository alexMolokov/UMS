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


class MessengerTree implements Tree
{
    private $id;

    public function __construct($id = null)
    {
        $this->id = $id;
    }

    public function getChildren()
    {
        if(is_null($this->id))
        {
            $collection = OrganizationUnit::whereNull("parent_id")->get();
        }  else {
            $collection =  OrganizationUnit::where("parent_id", "=", $this->id)->get();
        }



        $result = [];
        foreach($collection as $key => $unit) {
            $result[] = [
                "id" => (string) $unit->getOriginal('id'),
                "name" => $unit->name,
                "parentId" => $unit->parent_id,
                "hasChild" => (boolean) $unit->has_child
            ];
        }


        return $result;
    }


    public function getPath()
    {
        $result = [];
        $organization = OrganizationUnit::find($this->id);
        $result[] = ["name" => $organization->name, "id" => $this->id];

        $id = $organization->parent_id;
        while($id != null)
        {
            $organization = OrganizationUnit::find($id);
            array_unshift($result,["name" => $organization->name, "id" => $id]);
            $id =  $organization->parent_id;
        }

        return $result;
    }



}