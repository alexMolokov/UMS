<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Illuminate\Support\Facades\Route;
use App\Permission;

Route::get('/', function () {
      return view('welcome');
});

Route::group(['prefix' => 'auth', 'middleware' => ['web']], function ()
{
    //done
    Route::post('/login', 'Auth\AuthController@login')->name("login");
    //done
    Route::post('/logout', 'Auth\AuthController@logout')->name("logout");
    //done
    Route::post('/auto', 'Auth\AuthController@auto')->name("auto");
});


Route::group(['prefix' => 'admin', 'middleware' => ['web', 'auth', 'permissions']], function ()
{
    Route::post('/user/create', 'AdminUserController@createUser')->name("createAdminUser")->defaults("permission", Permission::ADMIN_CREATE_USER);
    Route::post('/user/{id}/get', 'AdminUserController@getUser')->name('getUser')->where('id', '[1-9]{1}[0-9]{0,}')->defaults("permission", Permission::ADMIN_WATCH_USER);
    Route::post('/user/list', 'AdminUserController@listUser')->name("listUser")->defaults("permission", Permission::ADMIN_WATCH_USER);
    Route::post('/user/{id}/password/change', 'AdminUserController@changePassword')
        ->name('changePassword')
        ->where('id', '[1-9]{1}[0-9]{0,}')
        ->defaults("permission", Permission::ADMIN_EDIT_USER);

    Route::post('/user/{id}/block', 'AdminUserController@block')
        ->name('blockAdminUser')
        ->where('id', '[1-9]{1}[0-9]{0,}')
        ->defaults("permission", Permission::ADMIN_EDIT_USER);

    Route::post('/user/{id}/setRoles', 'AdminUserController@setRoles')
        ->name('setRolesAdminUser')
        ->where('id', '[1-9]{1}[0-9]{0,}')
        ->defaults("permission", Permission::ADMIN_EDIT_USER);

    Route::post('/user/{id}/getRoles', 'AdminUserController@getRoles')
        ->name('getRolesAdminUser')
        ->where('id', '[1-9]{1}[0-9]{0,}')
        ->defaults("permission", Permission::ADMIN_EDIT_USER);

    Route::post('/user/{id}/setDates', 'AdminUserController@setDates')
        ->name('setDatesAdminUser')
        ->where('id', '[1-9]{1}[0-9]{0,}')
        ->defaults("permission", Permission::ADMIN_EDIT_USER);

    Route::post('/tree/children', 'OrganizationUnitController@getChildren')
        ->name('getOrganizationUnitChildren')
        ->defaults("permission", Permission::ADMIN_EDIT_USER);

    Route::post('/user/tree/paths', 'OrganizationUnitController@getPaths')
        ->name('getUserOrganizationUnitPaths')
        ->defaults("permission", Permission::ADMIN_EDIT_USER);


    Route::post('/role/create', 'RoleController@createRole')->name("createRole")->defaults("permission", Permission::ADMIN_CREATE_ROLE);


    Route::post('/role/{id}/update', 'RoleController@update')->name("updateRole")->defaults("permission", Permission::ADMIN_EDIT_ROLE);
    Route::post('/role/{id}/delete', 'RoleController@delete')->name("deleteRole")->defaults("permission", Permission::ADMIN_EDIT_ROLE);
    Route::post('/role/list', 'RoleController@listRole')->name("listRole")->defaults("permission", Permission::ADMIN_WATCH_ROLE);
    Route::match(["get", "post"],'/role/{id}/get', 'RoleController@get')->name('getRole')->defaults("permission", Permission::ADMIN_WATCH_ROLE);;
    Route::match(["get", "post"],'/permissions/tree', 'RoleController@getPermissionsTree')->name("getPermissionsTree")->defaults("permission", Permission::ADMIN_WATCH_ROLE);


    Route::post('/user/{id}/update', 'AdminUserController@updateProfile')
        ->name('updateUserProfile')
        ->where('id', '[1-9]{1}[0-9]{0,}')
        ->defaults("permission", Permission::ADMIN_EDIT_USER);
    });

Route::group(['prefix' => 'profile', 'middleware' => ['web', 'auth']], function ()
{
    //done
    Route::post('/update', 'ProfileController@update')->name("updateProfile");
    //done
    Route::post('/change/password', 'ProfileController@changePassword')->name("changePasswordProfile");
});


Route::group(['prefix' => 'role', 'middleware' => ['web', 'auth']], function ()
{
    Route::match(["get", "post"],'/list', 'RoleController@listRoles')->name("listRoles");
});



Route::group(['prefix' => 'user', 'middleware' => ['web', 'auth']], function ()
{
    Route::post('/block', 'UserController@block')->name("block_user");
    Route::post('/unblock', 'UserController@block')->name("block_user");
    Route::post('/sms/send', 'UserController@sendSms')->name("send_sms");
    Route::post('/push/send', 'UserController@sendPush')->name("send_push");
    Route::match(["get", "post"],'/list', 'UserController@listUser')->name("messengerListUser");
    Route::match(["post"],'/get', 'UserController@getUser')->name("messengerGetUser");
    Route::match(["post"],'/update/profile', 'UserController@updateProfile')->name("messengerUpdateProfile");
    Route::match(["post"],'/change/password', 'UserController@changePassword')->name("messengerChangePassword");
    Route::match(["post"],'/create', 'UserController@createUser')->name("messengerCreateUser");
});

