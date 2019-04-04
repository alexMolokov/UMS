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
    const NEW = 1;
    const APPROVE = 2;
    const CANCEL = 3;
    const REJECT = 4;
    const DONE = 5;

    protected $table = "order_states";
    public $timestamps = false;

    /**
     * @param $stateId
     * @throws InvalidArgumentException
     * @return mixed
     */
    public static function getName($stateId) {
        $states = [
            self::NEW=> "New",
            self::APPROVE => "Approve",
            self::CANCEL => "Cancelled",
            self::REJECT => "Rejected",
            self::DONE => "Done"
        ];


        if(!isset($states[$stateId])) {
            throw new \InvalidArgumentException("Invalid Order stateId {$stateId}");
        }

        return $states[$stateId];
    }
    
}