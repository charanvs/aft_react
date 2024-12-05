<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Judgement extends Model
{
    use HasFactory;

    protected $table = 'aft_judgement'; // Specify the table name
    protected $fillable = [
        'regno',
        'case_type',
        'file_no',
        'year',
        'associated',
        'dor',
        'deptt',
        'deptt_code',
        'subject',
        'subject_code',
        'petitioner',
        'respondent',
        'padvocate',
        'radvocate',
        'corum',
        'court_no',
        'gno',
        'appeal',
        'jro',
        'dod',
        'mod',
        'dpdf',
        'remarks',
        'headnotes',
        'citation',
        'location',
    ];

    public function registration()
    {
        return $this->hasOne(Registration::class, 'registration_no', 'regno');
    }

    public function disposedOf()
    {
        return $this->hasOne(DisposedOf::class, 'regno', 'regno');
    }

}
