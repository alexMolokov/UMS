<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 07.03.2019
 * Time: 11:23
 */

namespace Tests\Feature;

use Tests\Feature\Traits\UserTrait;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;

use App\OrganizationUnit\MessengerTree;

class MessengerTreeTest extends TestCase
{
    use UserTrait;
    use DatabaseTransactions;

       /* public function testGetChildren_Root_Nodes() {
            $tree = new MessengerTree();
            $children = $tree->getChildren();
        }*/

        /*public function testGetChildren_NoRoot_Nodes() {
            $tree = new MessengerTree("5c6fcf14ba44a8ea066f295f");
            $children = $tree->getChildren();
        }*/

        public function testGetPath_Leaf_Nodes() {
            $tree = new MessengerTree("5c6fcf47ba44a8ea066f2977");
            $path = $tree->getPath();
            var_dump($path);



}
