<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 06.03.2019
 * Time: 17:15
 */

namespace App\OrganizationUnit;

interface Tree
{
    /**
     * @param string | null $id
     * @return array
     */
    public function getChildren($id) : array ;

    public function getPath(string $id): array ;

    public  function get(array $ids = []): array;

}