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
        $permissions = $route->defaults["permission"];

        if(is_null($permissions) || $user->hasRole('superAdmin'))
        {
            $request->merge(["is_approved" => false]);
            return $next($request);
        }

        if(is_string($permissions)) $permissions = [$permissions];


        if($user->hasAnyPermission($permissions))
        {
            if($p = $user->getPermission($permissions[0])) {
                if($p->getOriginal("pivot_approved")) {
                    $request->merge(["is_approved" => $p->is_approved]);
                }
            }


            return $next($request);
        }

        if ($request->expectsJson())
        {
            return response()->json(['error' => 'Forbidden.'], 403);
        }

    }
}
