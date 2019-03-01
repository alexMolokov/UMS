<?php

namespace App\Order;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $fillable = [
        'firstname', 'lastname', 'email', 'login', 'password', 'blocked', 'position'
    ];

}
