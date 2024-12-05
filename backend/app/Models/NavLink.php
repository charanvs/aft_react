<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NavLink extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'url', 'parent_id', 'order'];

    public function children()
    {
        return $this->hasMany(NavLink::class, 'parent_id')->orderBy('order');
    }
}
