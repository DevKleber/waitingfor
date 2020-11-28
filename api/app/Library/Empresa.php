<?php

namespace App\Library;

class Empresa
{
    public static function get($req)
    {
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
            default:
                return false;

                break;
        }
    }
}
