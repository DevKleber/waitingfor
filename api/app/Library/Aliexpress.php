<?php

namespace App\Library;

use Illuminate\Support\Facades\Http;

class Aliexpress
{
    public static function get($req)
    {
        return self::getApi($req);
    }

    private static function getApi($req)
    {
        return self::getCrawler($req);
    }

    private static function getCrawler($req)
    {
        $response = Http::get($req['link']);
        $body = $response->body();

        $body = trim(preg_replace('/\s\s+/', ' ', $body));

        //pegando o titulo
        preg_match('/("subject":"(.*?)")/', $body, $t);
        $title = strip_tags($t[0] ?? null);
        $title = explode(':', $title)[1] ?? null;

        //Pegando o preço

        // preg_match('/(formatedAmount(.*?),)/', $body, $price);
        preg_match('/("freightExt":"(.*?),)/', $body, $price);
        $preco = strip_tags($price[0] ?? null);
        $preco = explode('p1', $preco)[1] ?? null;

        // (\'image(.*?),)
        // preg_match('/image":.*.(jpg|png)/', $body, $img);
        preg_match('/(\"imagePath"(.*?).(jpg|png))/', $body, $img);
        $imagem = strip_tags($img[0] ?? null);
        $expImagem = explode('":', $imagem)[1] ?? null;

        $precoPrudoto = str_replace(['",', "'", '"', ' ', '+', ',', ':', '\\'], '', $preco);

        return [
            'titulo' => str_replace(["'", '"', ','], '', $title),
            'valor' => $precoPrudoto,
            'imagem' => str_replace(["'", '"', ' '], '', $expImagem ?? null),
        ];
    }
}
