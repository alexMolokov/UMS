<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 19.02.2019
 * Time: 12:06
 */

namespace Tests\Feature\SuperAdmin;
use Illuminate\Foundation\Testing\TestResponse;
use Tests\Feature\Traits\UserTrait;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;


class RoleControllerTest extends TestCase
{
    const ROLE_FIELD_NAME = "name";
    const ROLE_FIELD_DESCRIPTION = "description";


    use UserTrait;
    use DatabaseTransactions;

    public function setUp()
    {
        parent::setUp();
        $this->setSuperAdmin();
    }

    public function testCreateRole_ValidData_StatusTrue()
    {
        $obj = $this->getCreateRoleResponse();
        $this->assertNotNull($obj->id);
    }

    public function dataProviderCreateRole_NoValidData() {
        return [
            "rus-name" => [["name" => "Русское имя", "description" => ""]],
            "null-description" => [["name" => "Русское имя", "description" => null]],
            "short-name" => [["name" => "Sh", "description" => ""]],
        ];
    }
    /**
     * @dataProvider dataProviderCreateRole_NoValidData
     */
    public function testCreateUserNoValidData_Status422($data)
    {
        $request = [];
        foreach($data as $key => $value) {
            if(!is_null($value)) $request[$key] = $value;
        }

        $url = route("createRole");
        $response = $this->postWrapper($url, $request);
        $response->assertStatus(422);
    }

    public function testGet_Id_Valid_Array(){
        $obj = $this->getCreateRoleResponse();
        $url  = route('getRole', ["id" => $obj->id]);
        $response =  $this->postWrapper($url);

        $response->assertStatus(200);
        $result = $this->getContent($response);

        $this->assertTrue($result->status);
        $getObj = $result->data;

        $this->assertEquals($getObj->id, $obj->id);

        $ar = (array) $getObj;

        $this->assertArrayHasKey("is_editable", $ar);
        $this->assertArrayHasKey("permissions", $ar);
        $this->assertArrayHasKey("tree", $ar);
    }

    public function testUpdate_NameDescription_StatusTrue() {
        $obj = $this->getCreateRoleResponse();

        $url  = route('updateRole', ["id" => $obj->id]);
        $data = [
            self::ROLE_FIELD_NAME => "UpdatedRole",
            self::ROLE_FIELD_DESCRIPTION => "UpdatedDescription"
        ];
        $response =  $this->postWrapper($url, $data);
        $response->assertStatus(200);

        $result = $this->getContent($response);
    }


    private function getCreateRoleResponse() {
        $url  = route('createRole');
        $data = [
            self::ROLE_FIELD_NAME => "TestRole",
            self::ROLE_FIELD_DESCRIPTION => "Тестовая роль"
        ];
        $response =  $this->postWrapper($url, $data);
        $response->assertStatus(200);

        $result = $this->getContent($response);

        $this->assertTrue($result->status);
        $this->assertEquals($data[self::ROLE_FIELD_NAME], $result->data->{self::ROLE_FIELD_NAME});
        $this->assertEquals($data[self::ROLE_FIELD_DESCRIPTION], $result->data->{self::ROLE_FIELD_DESCRIPTION});

        return $result->data;
    }

    private function getContent(TestResponse $response) {
        $content = $response->getContent();
        return  json_decode($content);
    }






}