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


class OrganizationUnitControllerTest extends TestCase
{
    use UserTrait;
    use DatabaseTransactions;

    public function setUp()
    {
        parent::setUp();
        $this->setSuperAdmin();
    }

    public function testGetPaths_ValidUser_StatusTrue()
    {
        $user = Auth::user();
        $data = [
            "id" => $user->id
        ];
        $url  = route('getUserOrganizationUnitPaths');
        $response = $this->postWrapper($url, $data);

        $response->assertStatus(200);

        $content = $response->getContent();
        $result = json_decode($content);

        $this->assertTrue( $result->status);
    }







}