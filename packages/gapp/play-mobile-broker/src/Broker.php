<?php
/**
 * Created by PhpStorm.
 * User: Анастасия
 * Date: 10.01.2019
 * Time: 10:09
 */

namespace Gapp\PlayMobileBroker;

use Gapp\PlayMobileBroker\Exception\RequestException;
use GuzzleHttp\Client;


class Broker
{
   const PRIORITY_LOW = "low";
   const PRIORITY_NORMAL = "normal";
   const PRIORITY_HIGH = "high";
   const PRIORITY_REALTIME = "realtime";

   const ERROR_HTTP_CODE = 400;
   const OK_HTTP_CODE = 200;

    private $config;
    private $recipient = "";
    private $priority = self::PRIORITY_NORMAL;
    private $client;

  public function __construct($config = [])
  {

     /* $this->config = [
        "url" => "",
        "login" => "",
        "password" => ""
      ];*/

      $this->config = $config;

      $this->client = new Client([
          'base_uri' => $this->config['url'],
          'timeout'  => 2.0,
      ]);
  }

  public function setRecipient($recipient)
  {
      $this->recipient = $recipient;
  }

  public function setPriority($priority)
  {
      $this->priority = $priority;
  }


  public function sendMessage($text)
  {

  }

  public function sendSms($text)
  {
      $sms = [
          "priority" => $this->priority,
          "sms" => [
              "originator" =>  "smsSender",
              "content" =>  ["text" =>  $text]
          ],
          "messages" => [
                "recipient" => $this->recipient

          ]
      ];


      try
      {
          $response = $this->client->request("POST", "/send", [
              "auth" =>  [
                  $this->config['login'],
                  $this->config['password']
              ],
              'json' => $sms
          ]);

          if($response->getStatusCode() == self::OK_HTTP_CODE) return true;

          if($response->getStatusCode() == self::ERROR_HTTP_CODE)
          {
              $body = json_decode($response->getBody());
              throw new RequestException($body["error_description"], $body["error_code"]);
          }

      }
      catch (\Exception $e)
      {
          throw new RequestException($e->getMessage(), $e->getCode(),$e);
      }
  }


}