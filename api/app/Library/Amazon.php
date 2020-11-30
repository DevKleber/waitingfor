<?php

namespace App\Library;

use Illuminate\Support\Facades\Http;

class Amazon
{
    public static function get($req)
    {
        $response = Http::get($req['link']);
        $body = $response->body();

        // $body = trim(preg_replace('/\s\s+/', ' ', $body));

        //pegando o titulo
        preg_match('/id=\"productTitle.*<\//', $body, $t);
        $title = strip_tags($t[0] ?? null);
        $title = explode('>', $title)[1] ?? null;

        //Pegando o preço

        preg_match('/id=\"priceblock_ourprice".*<\/span/', $body, $price);
        $preco = strip_tags($price[0] ?? null);
        $preco = explode('R$', $preco)[1] ?? null;

        if (null == $preco) {
            $content = preg_replace('/\s*/m', '', $body);

            preg_match('/(data-base-product-price=(.*?)">)/', $content, $price);
            $preco = strip_tags($price[2] ?? null);
            $preco = explode('R$', $preco)[1] ?? null;
        }

        // preg_match('/variationPath.*,/', $body, $img);
        //
        // preg_match('/https?:\/\/[^\/\s]+\/\S+\.(jpg|png)/', $body, $img);
        preg_match('/id=\"landingImage".*.(jpg|png)/', $body, $img);
        $imagem = strip_tags($img[0] ?? null);
        $expImagem = explode('&quot;', $imagem)[1] ?? null;

        $precoPrudoto = str_replace(['",', "'", '"', ' ', '+'], '', $preco);
        $formatoPrecoPrudoto = str_replace('.', '', $precoPrudoto);
        $formatoPrecoPrudoto = str_replace(',', '.', $formatoPrecoPrudoto);

        return [
            'titulo' => str_replace(["'", '"'], '', $title),
            'valor' => $formatoPrecoPrudoto,
            'imagem' => str_replace(["'", '"'], '', $expImagem ?? null),
        ];
    }
}
