<?php

namespace App\Library;

class Empresa
{
    public static function get($req)
    {
        // $class = ucfirst($req['dominio']);
        // return call_user_func_array([$class, $methodName], $req);

        switch ($req['dominio']) {
            case 'kabum':
                return Kabum::get($req);

                break;
            case 'magazineluiza':
                return MagazineLuiza::get($req);

                break;
            case 'amazon':
                return Amazon::get($req);

                break;
            case 'sony':
                return Sony::get($req);

                break;
            case 'centralar':
                return Centralar::get($req);

                break;
            case 'aliexpress':
                return Aliexpress::get($req);

                break;
            default:
                return false;

                break;
        }
    }
}
