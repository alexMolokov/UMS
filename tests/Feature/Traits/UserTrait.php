<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 19.02.2019
 * Time: 11:37
 */
namespace Tests\Feature\Traits;

use Illuminate\Support\Facades\Auth;
use Tests\Feature\Credentials;

trait UserTrait
{

    public function setSuperAdmin()
    {
        Auth::attempt(Credentials::getSuperAdmin());
        $this->be(Auth::user());
    }

    public function setAdmin()
    {
        Auth::attempt(Credentials::getAdmin());
        $this->be(Auth::user());
    }

    public function setManager()
    {
        Auth::attempt(Credentials::getManager());
        $this->be(Auth::user());
    }
}