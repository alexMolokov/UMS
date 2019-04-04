<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 02.04.2019
 * Time: 13:33
 */

namespace App\Order;


use App\User;
use App\Role;
use App\OrganizationUnit\OrganizationUnit;

class CalculateAccepter
{
        private $initiator;
        private $units = [];

        public function __construct(User $initiator)
        {
            $this->initiator = $initiator;
            $units =  $this->initiator->organizationUnits()->get();

            foreach($units as $unit){
                $this->units[]  = $unit->getOriginal("id");
            }
        }

        public function getAccepter(string $permissionName, string $startOUID): User {
                return $this->assignUser($permissionName, $this->getStartOUID($startOUID));
        }


        private function getStartOUID($startOUID) {
            $serviceUnit = $this->getUnitService();
            $currentOU = $startOUID;

            while(!empty($currentOU)) {
                if(in_array($currentOU, $this->units)) break;
                $currentOU = $serviceUnit->getParent($currentOU);
            }

            if(empty($currentOU))
                throw new \Exception("Bad OrganizationUnit");

            return $currentOU;
        }

        private function assignUser($permissionName, $startOUID ) {

            $serviceUnit = $this->getUnitService();
            $currentOU = $startOUID;

            while(!empty($currentOU)) {
                $ou = OrganizationUnit::find($currentOU);

                $assignedUsers = [];
                if($ou) {
                    $systemUsers = $ou->users()->get();

                    foreach ($systemUsers as $systemUser)
                    {
                        $permission = $systemUser->getPermission($permissionName);
                        if($permission) {
                            if(!$permission->getOriginal("pivot_approved")) {
                                $assignedUsers[] =  $systemUser;
                            }
                        }
                    }


                    if(count($assignedUsers) > 0)
                    {
                        $random = rand(0,count($assignedUsers) - 1);
                        return $assignedUsers[$random];
                    }
                }

                $currentOU = $serviceUnit->getParent($currentOU);
            }


            $user = User::role(Role::SUPER_ADMIN)->get()->random(1)->first();
            return $user;
        }

        protected function getUnitService()
        {
            return  resolve("EncryptServer\Interfaces\IOrganizationUnit");
        }
}