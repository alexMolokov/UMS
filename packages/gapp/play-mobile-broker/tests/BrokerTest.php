<?php
/**
 * Created by PhpStorm.
 * User: Анастасия
 * Date: 10.01.2019
 * Time: 12:05
 */

use Gapp\PlayMobileBroker\Broker;

class BrokerTest extends PHPUnit_Framework_TestCase
{
    private $client;

    public function __construct()
    {
        $this->client = new Broker([
            "url" => "http://91.204.239.42:8083/broker-api",
            "login" => "",
            "password" => ""
        ]);
        $this->client->setRecipient("79035481253");
    }

    public function testSendSms() {
        $result = $this->client->sendSms("test");
        $this->assertTrue($result);
    }
}
