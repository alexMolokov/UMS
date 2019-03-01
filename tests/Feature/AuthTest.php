<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\Feature\Credentials;

class AuthTest extends TestCase
{
    /**
     * Login Test.
     *
     * @return void
     */
    public function testMainPage()
    {
        $response = $this->get('/');
        $content = $response->getContent();
        $response->assertStatus(200);
        $this->assertContains('<div id="app"><app/></div>', $content);
    }

    public function dataProviderForValidLoginAndPassword() {
        return [
            "superAdmin" => [Credentials::getSuperAdmin()],
            "admin" => [Credentials::getAdmin()],
            "manager" => [Credentials::getManager()],
        ];
    }

    /**
     * @dataProvider dataProviderForValidLoginAndPassword
     */
    public function testLogin_ValidLoginAndPassword_StatusTrue($credentials) {
        $url  = route("login", []);
        $response = $this->postWrapper($url, $credentials);

        $content= $response->getContent();
        $response->assertStatus(200);
        $this->assertJson($content);

        $result = json_decode($content);
        $this->assertTrue($result->status);
    }

    public function testLogout_NoData_StatusTrue() {
        $response = $this->postWrapper('/auth/logout', []);
        $content= $response->getContent();

        $response->assertStatus(200);
        $this->assertJson($content);

        $result = json_decode($content);
        $this->assertTrue($result->status);
    }

    public function testLogin_NotValidLoginOrPassword_StatusFalse() {
        $url  = route("login", []);
        $response = $this->postWrapper($url, ["login" => "admin", "password" => "__+0123456!"]);
        $content= $response->getContent();

        $response->assertStatus(200);
        $this->assertJson($content);

        $result = json_decode($content);
        $this->assertFalse($result->status);


        $this->assertContains($result->message, "Неверное имя пользователя или пароль");
    }


    public function dataProviderForNoValidParams() {
        return [
            "no-login" => [null, "123456", ["login" => "Обязательно для заполнения"]],
            "no-password" => ["123456", null, ["password" => "Обязательно для заполнения"]],
            "nothing" => [null, null, ["login" => "Обязательно для заполнения", "password" => "Обязательно для заполнения"]],
            "nothing" => [null, null, ["login" => "Обязательно для заполнения", "password" => "Обязательно для заполнения"]],
            "short-password" => ["admin", "__", ["password" => "Cимволов не менее 6"]],
            "short-login" => ["adm", "__1234555", ["login" => "Cимволов не менее 5"]],
            "restricted-symbols-login"  => ["adm1$", "__1234555", ["login" => "Только буквы, цифры и дефис"]],
        ];
    }

    /**
     * @dataProvider  dataProviderForNoValidParams
     *
     */
    public function testAuthLogin_NoValidParams_ErrorStatus($login, $password, $messages)
    {
        $url  = route("login", []);
        $response = $this->postWrapper($url, ["login" => $login, "password" => $password]);

        $response->assertStatus(200);

        $content = $response->getContent();
        $this->assertJson($content);

        $result = json_decode($content);
        $this->assertFalse($result->status);

        foreach($messages as $key => $message)
            $this->assertContains($message, $result->data->{$key});
    }

}
