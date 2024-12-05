<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    
    protected function redirectTo(Request $request): ?string
    {
        if (in_array($request->path(), ['api/nav-links', 'api/judgements'])) {
            return $next($request); // Allow without token
        }
        
        return $request->expectsJson() ? null : route('login');
    }
}
