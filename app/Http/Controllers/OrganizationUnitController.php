<?php

namespace App\Http\Controllers;

use App\OrganizationUnit\OrganizationUnit;
use App\OrganizationUnit\TreeFactory;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;

use EncryptServer\Models\OrganizationUnit as OU;


class OrganizationUnitController extends Controller
{
    private $service;

    public function __construct()
    {
        $this->setEncryptServerIOrganizationUnit();
    }

    public function getChildren(Request $request)
    {
        $id =  $request->input("id");

        $tree = TreeFactory::create(Auth::user());
        return response()->success($tree->getChildren($id));
    }


    public function getPaths(Request $request)
    {
       $id =  $request->input("id");
       $user = $this->_getUser($id);

       $tree = TreeFactory::create(Auth::user());

       $result = [];

       $units = $user->organizationUnits()->get();
        foreach($units as $unit){
            $id = $unit->getOriginal("id");
            $result[]  = $tree->getPath($id);
        }

       return response()->success($result);
    }

    private function _getUser($id) {
        $user = User::find($id);
        if(!$user) abort(404, __("User not found") . ".");
        return $user;
    }

    public function copyUsers(Request $request, $copy = true){
        $ouId = $request->input("ou");
        $users = $request->input("users");
        try {
            $response = $this->service->copyUsers($ouId, $users,$copy);
            return response()->success([]);
        } catch (\Exception $e) {
            return response()->error();
        }
    }

    public function saveStructure(Request $request) {
        try {
            $this->rename($request);
            $this->add($request);
            $this->remove($request);
            return response()->success([]);
        }
        catch (\Exception $e) {
            return response()->error();
        }
    }

    private function rename(Request $request) {
        $items = $request->input("rename");
        foreach($items as $key => $name) {
            $unit = new OU([
                "guid" => $key,
                "name" => $name
            ]);

           $this->service->rename($unit);
        }
    }

    private function remove(Request $request){
        $items = $request->input("remove");
        $this->service->remove($items);

    }

    private function add(Request $request){
        $items = $request->input("add");
        foreach($items as $item) {
           $unit = $this->getUnit($item);
           $this->service->add($unit);
        }
    }

    private function getUnit($item){
        $data = [
            "name" => $item["name"],
        ];

        if(isset($item["parentId"])) {
            $data["parent"] = $item["parentId"];
        }

        $unit = new OU($data);

        if(count($item["children"]) > 0) {

            foreach($item["children"] as $childStructure) {
                $unit->addChildren(self::getUnit($childStructure));
            }
        }

        return $unit;
    }



    public function moveUsers(Request $request){
        return $this->copyUsers($request, false);
    }

    protected function setEncryptServerIOrganizationUnit()
    {
        $this->service = resolve("EncryptServer\Interfaces\IOrganizationUnit");
    }

}
