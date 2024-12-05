<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    protected $table = 'aft_registration';

    public function interimJudgements()
    {
        return $this->hasMany(InterimJudgement::class, 'regid', 'id');
    }
}
