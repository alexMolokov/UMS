<?php

use Illuminate\Database\Seeder;
use App\Permission;
use App\PermissionsGroup;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createAdminPermissions();
        $this->createMessengerPermissions();
        $this->createFeedBackPermissions();
        $this->createLogPermissions();
    }

    private function createAdminPermissions(){
        $adminGroup = PermissionsGroup::create([
            "name" => PermissionsGroup::ADMIN,
            "title" => PermissionsGroup::getTitle(PermissionsGroup::ADMIN)
        ]);

        Permission::create([
            "name" => Permission::ADMIN_WATCH_USER,
            "title" => Permission::getTitle(Permission::ADMIN_WATCH_USER),
            "group_id" => $adminGroup["id"]
        ]);

        Permission::create([
            "name" => Permission::ADMIN_CREATE_USER,
            "title" => Permission::getTitle(Permission::ADMIN_CREATE_USER),
            "group_id" => $adminGroup["id"]
        ]);
        Permission::create([
            "name" => Permission::ADMIN_EDIT_USER,
            "title" => Permission::getTitle(Permission::ADMIN_EDIT_USER),
            "group_id" => $adminGroup["id"]
        ]);

        Permission::create([
            "name" => Permission::ADMIN_BLOCK_USER,
            "title" => Permission::getTitle(Permission::ADMIN_BLOCK_USER),
            "group_id" => $adminGroup["id"]
        ]);

        Permission::create([
            "name" => Permission::ADMIN_WATCH_ROLE,
            "title" => Permission::getTitle(Permission::ADMIN_WATCH_ROLE),
            "group_id" => $adminGroup["id"]
        ]);

        Permission::create([
            "name" => Permission::ADMIN_CREATE_ROLE,
            "title" => Permission::getTitle(Permission::ADMIN_CREATE_ROLE),
            "group_id" => $adminGroup["id"]
        ]);
        Permission::create([
            "name" => Permission::ADMIN_EDIT_ROLE,
            "title" => Permission::getTitle(Permission::ADMIN_EDIT_ROLE),
            "group_id" => $adminGroup["id"]
        ]);

        Permission::create([
            "name" => Permission::ADMIN_DELETE_ROLE,
            "title" => Permission::getTitle(Permission::ADMIN_DELETE_ROLE),
            "group_id" => $adminGroup["id"]
        ]);
    }



    private function createMessengerPermissions(){
        $messengerGroup = PermissionsGroup::create([
            "name" => PermissionsGroup::MESSENGER,
            "title" => PermissionsGroup::getTitle(PermissionsGroup::MESSENGER)
        ]);

        Permission::create([
            "name" => Permission::MESSENGER_WATCH_USER,
            "title" => Permission::getTitle(Permission::MESSENGER_WATCH_USER),
            "group_id" => $messengerGroup["id"]
        ]);

        Permission::create([
            "name" => Permission::MESSENGER_BLOCK_USER,
            "title" => Permission::getTitle(Permission::MESSENGER_BLOCK_USER),
            "group_id" => $messengerGroup["id"]
        ]);

        Permission::create([
            "name" => Permission::MESSENGER_SMS_SEND,
            "title" => Permission::getTitle(Permission::MESSENGER_SMS_SEND),
            "group_id" => $messengerGroup["id"]
        ]);

        Permission::create([
            "name" => Permission::MESSENGER_CREATE_USER,
            "title" => Permission::getTitle(Permission::MESSENGER_CREATE_USER),
            "group_id" => $messengerGroup["id"]
        ]);

        Permission::create([
            "name" => Permission::MESSENGER_CREATE_STRUCTURE,
            "title" => Permission::getTitle(Permission::MESSENGER_CREATE_STRUCTURE),
            "group_id" => $messengerGroup["id"]
        ]);

        Permission::create([
            "name" => Permission::MESSENGER_EDIT_STRUCTURE,
            "title" => Permission::getTitle(Permission::MESSENGER_EDIT_STRUCTURE),
            "group_id" => $messengerGroup["id"]
        ]);

        Permission::create([
            "name" => Permission::MESSENGER_MOVE_USER,
            "title" => Permission::getTitle(Permission::MESSENGER_MOVE_USER),
            "group_id" => $messengerGroup["id"]
        ]);

        Permission::create([
            "name" => Permission::MESSENGER_COPY_USER,
            "title" => Permission::getTitle(Permission::MESSENGER_COPY_USER),
            "group_id" => $messengerGroup["id"]
        ]);

    }

    private function createFeedBackPermissions(){
        $group = PermissionsGroup::create([
            "name" => PermissionsGroup::FEEDBACK,
            "title" => PermissionsGroup::getTitle(PermissionsGroup::FEEDBACK)
        ]);

        Permission::create([
            "name" => Permission::FEEDBACK,
            "title" => Permission::getTitle(Permission::FEEDBACK),
            "group_id" => $group["id"]
        ]);

    }


    private function createLogPermissions(){
        $logGroup = PermissionsGroup::create([
            "name" => PermissionsGroup::LOG,
            "title" => PermissionsGroup::getTitle(PermissionsGroup::LOG)
        ]);

        Permission::create([
            "name" => Permission::LOG_WATCH,
            "title" => Permission::getTitle(Permission::LOG_WATCH),
            "group_id" => $logGroup["id"]
        ]);


    }

}
