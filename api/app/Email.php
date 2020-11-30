<?php

namespace App;

use App\Mail\IsOnSale;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

class Email extends Model
{
    public static function isOnSale($req)
    {
        Mail::to($req['email'])->queue(new IsOnSale($req));

        return $req;
    }
}
