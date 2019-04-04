<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Response;
use Illuminate\Support\Facades\Validator;
use DB;
use Monolog\Logger;
use Monolog\Handler\GelfHandler;
use Gelf\Publisher;
use Gelf\Transport\UdpTransport;



class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Response::macro('success', function ($data = [], $message = "") {
            return Response::json([
                'status' => true,
                'message' => $message,
                'data' => $data,

            ]);
        });

        Response::macro('error', function ($message, $data = []) {
            return Response::json([
                'status' => false,
                'message' => $message,
                'data' => $data
            ]);
        });

        Validator::extend('alpha_spaces', function ($attribute, $value) {

            // This will only accept alpha and spaces.
            // If you want to accept hyphens use: /^[\pL\s-]+$/u.
            return preg_match('/^[\pL\s]+$/u', $value);

        });

        DB::listen(function ($query) {
            //echo  $query->sql . "\r\n";
             //$query->bindings
             //$query->time
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton("EncryptServer\Interfaces\IUserInterface", function($app)
        {
           $config = config("encrypt-server");
           return new \EncryptServer\UserFacade(
               new \EncryptServer\Utils\ProtobufClientAdmin($config)
           );
        });

        $this->app->singleton("EncryptServer\Interfaces\IOrganizationUnit", function($app)
        {
            $config = config("encrypt-server");
            return new \EncryptServer\OrganizationUnitFacade(
                new \EncryptServer\Utils\ProtobufClientAdmin($config)
            );
        });

        $this->app->singleton("Psr\Log\LoggerInterface\Action", function($app)
        {
            $config = config("log-service");


            $appName = env("APP_NAME");
            $logger = new Logger($appName);

            $publisher = new Publisher( new UdpTransport(
                                $config["host"],
                                $config["port"]
                                 )
            );

            $logger->pushHandler(
                new GelfHandler($publisher , Logger::INFO, false)
            );

            return $logger;

        });







    }
}
