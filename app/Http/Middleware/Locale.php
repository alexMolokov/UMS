<?php

namespace App\Http\Middleware;

use Closure;
use App;

class Locale
{
    private static $supportedLanguages = ['en','ru', 'uz'];
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $locale = $request->input('lang');

        if(in_array($locale, self::$supportedLanguages))
        {
            App::setLocale($locale);
        }
        return $next($request);
    }
}
