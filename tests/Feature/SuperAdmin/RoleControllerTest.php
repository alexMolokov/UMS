<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 19.02.2019
 * Time: 12:06
 */

namespace Tests\Feature\SuperAdmin;
use Tests\Feature\Traits\UserTrait;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;


class RoleControllerTest extends TestCase
{
    use UserTrait;
    use DatabaseTransactions;

    public function setUp()
    {
        parent::setUp();
        $this->setSuperAdmin();
    }

    public function testCreateRole_ValidData_StatusTrue()
    {
        $data = [
            'name' => "TestRole",
            'description' => "Тестовая роль"
        ];

        $url  = route('createRole');
        $response = $this->postWrapper($url, $data);
        $response->assertStatus(200);

        $content = $response->getContent();
        $result = json_decode($content);

        $this->assertTrue( $result->status);
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





}