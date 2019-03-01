<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 19.02.2019
 * Time: 12:06
 */

namespace Tests\Feature\NoAuth;
use Tests\Feature\Traits\UserTrait;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;


class AdminUserControllerTest extends TestCase
{
    use UserTrait;
    use DatabaseTransactions;

    #### No auth user

    public function dataProvider() {
        return [
           "createAdminUser" =>  ["createAdminUser"],
           "getUser"  =>  ["getUser", ["id" => 1]],
           "listUser"  =>  ["listUser"],
           "changePassword"  =>  ["changePassword", ["id" => 1]],
           "updateUserProfile"  =>  ["getUser", ["id" => 1]],
        ];
    }

    /**
     * @dataProvider  dataProvider
     */
    public function testAction_401Error($action, $params = []) {
        $url  = route($action, $params);
        $response = $this->postWrapper($url);
        $response->assertStatus(401);
    }


}