<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 07.03.2019
 * Time: 12:29
 */

namespace App\OrganizationUnit;
use App\User;


class TreeFactory
{

        public static function create(User $user)
        {
            $facade = resolve("EncryptServer\Interfaces\IOrganizationUnit");

            $messengerTree = new MessengerTree($facade);

            if($user->isSuperAdmin())
                    return $messengerTree;


            $tree = new UserMessengerTreeDecorator($messengerTree);
            $tree->setIds(self::getTopUnits($user));

            return $tree;

        }

        private static function getTopUnits($user) {
            $result = [];
            $units = $user->organizationUnits()->get();

            foreach($units as $unit){
                $result[] = $unit->getOriginal("id");
            }

            return $result;
        }
}