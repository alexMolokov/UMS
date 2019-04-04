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
    Route::post('/login', 'Auth\AuthController@login')->name("login");

    Route::post('/logout', 'Auth\AuthController@logout')->name("logout");

    Route::post('/auto', 'Auth\AuthController@auto')->name("auto");
});

Route::group(['prefix' => 'admin', 'middleware' => ['web', 'auth', 'permissions']], function ()
{
    Route::post('/user/create', 'AdminUserController@createUser')
        ->name("createAdminUser")
        ->defaults("permission", Permission::ADMIN_CREATE_USER);

    Route::post('/user/{id}/get', 'AdminUserController@getUser')
        ->name('getUser')
        ->where('id', '[1-9]{1}[0-9]{0,}')
        ->defaults("permission", Permission::ADMIN_WATCH_USER);

    Route::post('/user/list', 'AdminUserController@listUser')
        ->name("listUser")
        ->defaults("permission", Permission::ADMIN_WATCH_USER);

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
        ->defaults("permission", [Permission::MESSENGER_WATCH_USER, Permission::ADMIN_EDIT_USER]);

    Route::post('/user/tree/paths', 'OrganizationUnitController@getPaths')
        ->name('getUserOrganizationUnitPaths')
        ->defaults("permission", Permission::ADMIN_EDIT_USER);

    Route::post('/role/create', 'RoleController@createRole')
        ->name("createRole")
        ->defaults("permission", Permission::ADMIN_CREATE_ROLE);

    Route::post('/role/{id}/update', 'RoleController@update')
        ->name("updateRole")
        ->defaults("permission", Permission::ADMIN_EDIT_ROLE);

    Route::post('/role/{id}/delete', 'RoleController@delete')
        ->name("deleteRole")
        ->defaults("permission", Permission::ADMIN_EDIT_ROLE);

    Route::post('/role/list', 'RoleController@listRole')
        ->name("listRole")
        ->defaults("permission", Permission::ADMIN_WATCH_ROLE);

    Route::match(["get", "post"],'/role/{id}/get', 'RoleController@get')
        ->name('getRole')
        ->defaults("permission", Permission::ADMIN_WATCH_ROLE);

    Route::match(["get", "post"],'/permissions/tree', 'RoleController@getPermissionsTree')
        ->name("getPermissionsTree")
        ->defaults("permission", Permission::ADMIN_WATCH_ROLE);

    Route::post('/user/{id}/update', 'AdminUserController@updateProfile')
        ->name('updateUserProfile')
        ->where('id', '[1-9]{1}[0-9]{0,}')
        ->defaults("permission", Permission::ADMIN_EDIT_USER);
 });

Route::group(['prefix' => 'profile', 'middleware' => ['web', 'auth']], function ()
{
    Route::post('/update', 'ProfileController@update')
        ->name("updateProfile");

    Route::post('/change/password', 'ProfileController@changePassword')
        ->name("changePasswordProfile");
});

Route::group(['prefix' => 'role', 'middleware' => ['web', 'auth']], function ()
{
    Route::match(["get", "post"],'/list', 'RoleController@listRoles')
        ->name("listRoles");
});

Route::group(['prefix' => 'user', 'middleware' => ['web', 'auth', 'permissions']], function ()
{
    Route::post('/block', 'UserController@block')
        ->name("block_user")
        ->defaults("permission", Permission::MESSENGER_BLOCK_USER);

    Route::match(["post"],'/list', 'UserController@listUser')
        ->name("messengerListUser")
        ->defaults("permission", Permission::MESSENGER_WATCH_USER);

    Route::match(["post"],'/get', 'UserController@getUser')
        ->name("messengerGetUser")
        ->defaults("permission", Permission::MESSENGER_WATCH_USER);

    Route::match(["post"],'/move', 'OrganizationUnitController@moveUsers')
        ->name("messengerMoveUsers")
        ->defaults("permission", Permission::MESSENGER_MOVE_USER);

    Route::match(["post"],'/copy', 'OrganizationUnitController@copyUsers')
        ->name("messengerCopyUsers")
        ->defaults("permission", Permission::MESSENGER_COPY_USER);

    Route::match(["post"],'/change/password', 'UserController@changePassword')
        ->name("messengerChangePassword")
        ->defaults("permission", Permission::MESSENGER_EDIT_USER);

    Route::match(["post"],'/update/profile', 'UserController@updateProfile')
        ->name("messengerUpdateProfile")
        ->defaults("permission", Permission::MESSENGER_EDIT_USER);

    Route::match(["post"],'/create', 'UserController@createUser')
        ->name("messengerCreateUser")
        ->defaults("permission", Permission::MESSENGER_EDIT_USER);

    Route::match(["post"],'/create/csv', 'UserController@createFromCsv')
        ->name("messengerCreateFromCsv")
        ->defaults("permission", Permission::MESSENGER_EDIT_USER);


    Route::match(["post"],'/ou/has', 'UserController@hasUser')
        ->name("messengerOuHasUser")
        ->defaults("permission", Permission::MESSENGER_WATCH_USER);

});

Route::group(['prefix' => 'ou', 'middleware' => ['web', 'auth']], function ()
{
    Route::match(["post"],'/structure/save', 'OrganizationUnitController@saveStructure')
        ->name("messengerSaveStructure");
});

Route::group(['prefix' => 'order', 'middleware' => ['web', 'auth']], function ()
{
    Route::match(["post"],'/reject', 'OrderController@reject')
        ->name("orderReject");

    Route::match(["post"],'/done', 'OrderController@done')
        ->name("orderDone");

    Route::match(["post"],'/my', 'OrderController@myList')
        ->name("orderMyList");

    Route::match(["post"],'/my/cancel', 'OrderController@cancelMy')
        ->name("cancelMy");

    Route::match(["post"],'/my/{id}', 'OrderController@my')
        ->name("orderMy");


    Route::match(["post"],'/assigned', 'OrderController@assignedList')
        ->name("orderAssignedList");

    Route::match(["post"],'/assigned/{id}', 'OrderController@assigned')
        ->name("orderAssigned");

});