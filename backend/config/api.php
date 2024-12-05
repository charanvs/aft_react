<?php

return [
    'rate_limits' => [
        'api' => env('API_RATE_LIMIT', '60,1'),
        'web' => env('WEB_RATE_LIMIT', '100,1'),
    ],
];
