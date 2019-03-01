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


class AdminUserControllerTest extends TestCase
{
    use UserTrait;
    use DatabaseTransactions;

    public function setUp()
    {
        parent::setUp();
        $this->setSuperAdmin();
    }

    public function testCreateUser_ValidData_StatusTrue()
    {
        $data = [
            'login' => "petrov",
            'firstname' => "ivan",
            'lastname' => "ivanov",
            'position' => "менеджер",
            'email' => "petrov@ya.ru",
            'password' => 'password',
            "roles" => []

        ];
        $url  = route('createAdminUser');
        $response = $this->postWrapper($url, $data);
        $response->assertStatus(200);

        $content = $response->getContent();
        $result = json_decode($content);

        $this->assertTrue( $result->status);
        $this->assertSame($data["login"], $result->data->login);
        $this->assertSame($data["firstname"], $result->data->firstname);
        $this->assertSame($data["lastname"], $result->data->lastname);
        $this->assertSame($data["position"], $result->data->position);
        $this->assertSame($data["email"], $result->data->email);
        $this->assertGreaterThan(0,$result->data->id);
    }
    /**
     * There is no parameter at request
     */
    public function dataProviderCreateUser_NoValidData() {
        return [
            "no-login" => [["login"]],
            "no-all" => [["login", "email", "password", "roles"]],
            "only-login" => [["email", "password", "roles"]],
            "email-login" => [["password", "roles"]],
            "roles-login" => [["password", "email"]],
        ];
    }
    /**
     * @dataProvider dataProviderCreateUser_NoValidData
     */
    public function testCreateUserNoValidData_Status422($remove = [])
    {
        $data = [
            'login' => "petrov",
            'firstname' => "ivan",
            'lastname' => "ivanov",
            'position' => "менеджер",
            'email' => "petrov@ya.ru",
            'password' => 'password',
            "roles" => []

        ];

        foreach($remove as $key)
        {

            if(isset($data[$key]))
                    unset($data[$key]);
        }

        $url = route("createAdminUser");
        $response = $this->postWrapper($url, $data);
        $response->assertStatus(422);
    }

    public function testGetUser_StatusTrue()
    {
        $user = Auth::user();
        $url = route("getUser", ["id" => $user->id]);
        $response = $this->postWrapper($url, []);
        $response->assertStatus(200);

        $content = $response->getContent();
        $result = json_decode($content);

        $this->assertTrue($result->status);
        $this->assertEquals($user->id, $result->data->id);
        $this->assertEquals($user->login, $result->data->login);
    }

    public function dataProvider_GetUser_NotExistsUser_404Error() {
        return [
           "nil" =>  [0],
           "not-integer" => ["ddd"],
           "null" => [null],
           "float" => [0.5],
           "less-0" => [-1]
        ];
    }

    /**
     * @dataProvider dataProvider_GetUser_NotExistsUser_404Error
     */
    public function testGetUser_NotExistsUser_404Error($id)
    {
        $url = route('getUser', ["id" => $id]);
        $response = $this->postWrapper($url, []);
        $response->assertStatus(404);
        $this->assertNotContains("user",$response->getContent());
    }

    public function testListUser_Page1_200OK() {
        $url  = route("listUser", ["page" => 1]);
        $response = $this->postWrapper($url);
        $response->assertStatus(200);
        $content = $response->getContent();
        $result = json_decode($content);

        $this->assertSame(1, $result->current_page);
        $this->assertNotNull($result->data);
        $this->assertGreaterThan(0,count($result->data));
    }

    public function testChangePassword_ValidPassword_StatusTrue() {
        $user = Auth::user();
        $url  = route("changePassword", ["id" => $user->id]);
        $password = "12345_!6";
        $response = $this->postWrapper($url, ["newPassword" => $password, "repeatPassword" => $password]);
        $content = $response->getContent();
        $result = json_decode($content);
        $response->assertStatus(200);
        $this->assertTrue($result->status);
    }

    public function dataProvider_ChangePassword_NotValidPassword_422Error() {
        return [
            "short-password" => ["1234"],
            "no-password" => [null],
            "different-passwords" => ["123456", "1234"]
        ];
    }

    /**
     * @dataProvider  dataProvider_ChangePassword_NotValidPassword_422Error
     */
    public function testChangePassword_NotValidPassword_422Error($password, $repeatPassword = null) {
        $user = Auth::user();
        $url  = route("changePassword", ["id" => $user->id]);
        $repeatPassword = $repeatPassword ?? $password;
        $response = $this->postWrapper($url, ["newPassword" => $password, "repeatPassword" => $repeatPassword]);
        $response->assertStatus(422);
    }

}