<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 19.02.2019
 * Time: 12:06
 */

namespace Tests\Feature\Manager;
use Tests\Feature\Traits\UserTrait;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;


class AdminUserControllerTest extends TestCase
{
    use UserTrait;
    use DatabaseTransactions;

    public function setUp()
    {
        parent::setUp();
        $this->setManager();
    }

    public function dataProvider() {
        return [
            "createAdminUser" =>  ["createAdminUser"],
            "changePassword"  =>  ["changePassword", ["id" => 1]],
            "updateUserProfile"  =>  ["updateUserProfile", ["id" => 1]]
        ];
    }

    /**
     * @dataProvider  dataProvider
     */
    public function testAction_403Error($action, $params = []) {
        $url  = route($action, $params);
        $response = $this->postWrapper($url);
        $response->assertStatus(403);
    }


    public function dataProvider404() {
        return [
            "getUser"  =>  ["getUser", ["id" => 0]],
        ];
    }

    /**
     * @dataProvider  dataProvider404
     */
    public function testAction_404Error($action, $params = []) {
        $url  = route($action, $params);
        $response = $this->postWrapper($url);
        $response->assertStatus(404);
    }


    public function testListUser_NoParams_200OK() {
        $url  = route("listUser", []);
        $response = $this->postWrapper($url);
        $response->assertStatus(200);
        $content = $response->getContent();
        $result = json_decode($content);

        $this->assertSame(1, $result->current_page);
        $this->assertNotNull($result->data);
        $this->assertGreaterThan(0,count($result->data));
    }


    public function dataProviderError422() {
        return [
            "listUser"  =>  ["listUser", ["per_page" => 0]],
            "listUser"  =>  ["listUser", ["per_page" => -1]],
            "listUser"  =>  ["listUser", ["page" => 1, "per_page" => 0.5]],
            "listUser"  =>  ["listUser", ["page" => -1, "per_page" => 10]],
            "listUser"  =>  ["listUser", ["page" => 1, "per_page" => 11]],
        ];
    }

    /**
     * @dataProvider dataProviderError422
     */
    public function testListUser_WrongParams_422Error($action, $params) {
        $url  = route($action, $params);
        $response = $this->postWrapper($url);
        $response->assertStatus(422);
    }

}