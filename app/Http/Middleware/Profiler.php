<?php

namespace App\Http\Middleware;

use Closure;

class Profiler
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $start = microtime(true);
        $response =  $next($request);
        $end = microtime(true);

        return $response->withHeaders([
            "X-ProfilerTime" => ($end - $start)
        ]);

    }
}
