<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 28.02.2019
 * Time: 15:00
 */

namespace App\Order;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    const FRESH = 1;
    const APPROVE = 2;
    const CANCEL = 3;
    const REJECT = 4;
    const DONE = 5;

    /**
     * @param $stateId
     * @throws InvalidArgumentException
     * @return mixed
     */
    public static function getName($stateId) {
        $states = [
            self::FRESH=> "New",
            self::APPROVE => "Approve",
            self::CANCEL => "Cancel",
            self::REJECT => "Reject",
            self::DONE => "Done"
        ];


        if(!isset($states[$stateId])) {
            throw new \InvalidArgumentException("Invalid Order stateId {$stateId}");
        }

        return $states[$stateId];
    }
    
}