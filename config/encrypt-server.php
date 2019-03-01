<?php

return [
        "uri" => env('ENCRYPT_SERVER_URI', '//127.0.0.1:37210'),
        'domain' => env('ENCRYPT_SERVER_DOMAIN', 'sample.com'),
        'login' => env('ENCRYPT_SERVER_LOGIN', 'login'),
        'password' => env('ENCRYPT_SERVER_PASSWORD', 'password'),
        'adminPassword' => env('ENCRYPT_SERVER_ADMIN_PASSWORD', 'adminPassword'),
        'useStreamContext' => env('ENCRYPT_SERVER_USE_STREAM_CONTEXT', true)
];
