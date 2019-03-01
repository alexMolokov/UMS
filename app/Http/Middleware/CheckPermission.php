<?php

namespace App\Http\Middleware;

use Closure;

class CheckPermission
{
    /**
     * Check if user has access to part
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param string $permission
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = $request->user();

        /** Illuminate\Routing\Route $route */
        $route = $request->route();
        $permission = $route->defaults["permission"];

        if(is_null($permission) || $user->hasRole('superAdmin'))
        {
            return $next($request);
        }

        if($user->hasPermissionTo($permission))
        {
            return $next($request);
        }

        if ($request->expectsJson())
        {
            return response()->json(['error' => 'Forbidden.'], 403);
        }

    }
}
