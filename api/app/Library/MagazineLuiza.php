<?php

namespace App\Library;

use Illuminate\Support\Facades\Http;

class MagazineLuiza
{
    public static function get($req)
    {
        $response = Http::get($req['link']);
        $body = $response->body();

        preg_match('/fullTitle.*,/', $body, $t);
        $title = $t[0];
        $exp = explode(':', $title);

        preg_match('/bestPriceTemplate.*,/', $body, $price);
        $preco = $price[0];
        $expValue = explode(':', $preco);

        // preg_match('/variationPath.*,/', $body, $img);
        preg_match('/https?:\/\/[^\/\s]+\/\S+\.(jpg|png)/', $body, $img);
        $imagem = $img[0];
        $expImagem = explode(':', $imagem);

        $precoPrudoto = str_replace(['",', "'", '"', ' '], '', $expValue[1]);
        $formatoPrecoPrudoto = str_replace('.', '', $precoPrudoto);
        $formatoPrecoPrudoto = str_replace(',', '.', $formatoPrecoPrudoto);

        return [
            'titulo' => str_replace(["'", '"'], '', $exp[1]),
            'valor' => $formatoPrecoPrudoto,
            'imagem' => str_replace(["'", '"'], '', $expImagem[1]),
        ];
    }
}
