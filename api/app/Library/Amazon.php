<?php

namespace App\Library;

use Illuminate\Support\Facades\Http;

class Amazon
{
    public static function get($req)
    {
        $response = Http::get($req['link']);
        $body = $response->body();
        $contentBody = trim(preg_replace('/\s\s+/', ' ', $body));

        $title = self::getTitle($contentBody, $body, $req);
        $price = self::getPrice($body);
        $image = self::getImage($body);

        return self::proccess($title, $price, $image);
    }

    private static function getTitle($contentBody, $body, $req = null)
    {
        preg_match('/id=\"productTitle.*<\//', $contentBody, $t);
        if (count($t) <= 0) {
            preg_match('/id=\"productTitle.*<\//', $body, $t);
            if (count($t) <= 0) {
                preg_match('/("productTitle"(.*?)<)/', $contentBody, $t);
            }
        }
        $title = strip_tags($t[0] ?? null);

        return explode('>', $title)[1] ?? null;
    }

    private static function getPrice($body)
    {
        preg_match('/id=\"priceblock_ourprice".*<\/span/', $body, $price);
        $preco = strip_tags($price[0] ?? null);
        $preco = explode('R$', $preco)[1] ?? null;

        if (null == $preco) {
            $content = preg_replace('/\s*/m', '', $body);

            preg_match('/(data-base-product-price=(.*?)">)/', $content, $price);
            $preco = strip_tags($price[2] ?? null);
            $preco = explode('R$', $preco)[1] ?? null;
        }

        return $preco;
    }

    private static function getImage($body)
    {
        preg_match('/id=\"landingImage".*.(jpg|png)/', $body, $img);
        $imagem = strip_tags($img[0] ?? null);

        return explode('&quot;', $imagem)[1] ?? null;
    }

    private static function proccess($title, $price, $image)
    {
        $price = str_replace(['",', "'", '"', ' ', '+'], '', $price);
        $price = str_replace('.', '', $price);
        $price = str_replace(',', '.', $price);
        $title = str_replace(["'", '"'], '', $title);
        $image = str_replace(["'", '"'], '', $image ?? null);

        return [
            'titulo' => $title ?? null,
            'valor' => $price ?? null,
            'imagem' => $image ?? null,
        ];
    }
}
