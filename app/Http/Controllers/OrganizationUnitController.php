<?php

namespace App\Http\Controllers;

use App\OrganizationUnit\OrganizationUnit;
use App\OrganizationUnit\TreeFactory;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;

use EncryptServer\Models\OrganizationUnit as OU;
use App\Order\ActionFactory;



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

    public function copyUsers(Request $request){
        $request->merge(["action" => ActionFactory::COPY_USER]);
        $action = ActionFactory::create($request);
        $order = $action->handle($request->input("order_id"));
        return response()->success([
            "id" => $order->id,
            "order_state_id" => $order->order_state_id
        ]);

    }

    public function moveUsers(Request $request){
        $request->merge(["action" => ActionFactory::MOVE_USER]);
        $action = ActionFactory::create($request);
        $order = $action->handle($request->input("order_id"));
        return response()->success([
            "id" => $order->id,
            "order_state_id" => $order->order_state_id
        ]);
    }


    public function saveStructure(Request $request) {
        try {
            $this->change($request);
            $this->remove($request);
            $result = $this->add($request);
            return response()->success($result);
        }
        catch (\Exception $e) {
            return response()->error();
        }
    }

    private function change(Request $request) {
        $items = $request->input("change");
        foreach($items as $key => $value) {
            $unit = new OU([
                "guid" => $key,
                "name" => $value["name"]
            ]);

           $this->service->change($unit);
        }
    }

    private function remove(Request $request){
        $items = $request->input("remove");
        $this->service->remove($items);

    }

    private function add(Request $request){
        $result = [];
        $items = $request->input("add");
        foreach($items as $item) {
           $unit = $this->getUnit($item);
           $ou = $this->service->add($unit);
           $result = array_merge($result, $this->getAddResult($ou));
        }

        return $result;
    }

    private function getAddResult(OU $unit) {
        $result = [];

        $result[] = [
            "id" => $unit->getGuid(),
            "parentId" => $unit->getParent(),
            "name" => $unit->getName()
        ];

        $children = $unit->getChildren();
        foreach($children as $child) {
            $result = array_merge($result, $this->getAddResult($child));
        }
        return $result;
    }


    private function getUnit($item){
        $data = [
            "name" => $item["name"]
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


    protected function setEncryptServerIOrganizationUnit()
    {
        $this->service = resolve("EncryptServer\Interfaces\IOrganizationUnit");
    }

}
