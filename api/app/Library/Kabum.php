<?php

namespace App\Library;

use Illuminate\Support\Facades\Http;

class Kabum
{
    public static function get($req)
    {
        $response = Http::get($req['link']);
        $body = $response->body();

        preg_match('/pname.*\"/', $body, $t);
        $title = $t[0] ?? null;
        $exp = explode('pname: "', $title);

        preg_match('/value:.*\'/i', $body, $price);
        $preco = $price[0] ?? null;
        $expValue = explode('value: \'', $preco);

        preg_match('/(<li><img src=\"https:\/\/images.([^\"]*)\")/', $body, $img);
        $imagem = $img[0] ?? null;
        $expImagem = explode('<li><img src=', $imagem);

        return [
            'titulo' => utf8_encode(str_replace(["'", '"'], '', $exp[1] ?? null)),
            'valor' => utf8_encode(str_replace(["'", '"'], '', $expValue[1] ?? null)),
            'imagem' => utf8_encode(str_replace(["'", '"'], '', $expImagem[1] ?? null)),
        ];
    }
}
