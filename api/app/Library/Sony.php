<?php

namespace App\Library;

use Illuminate\Support\Facades\Http;

class Sony
{
    public static function get($req)
    {
        return self::getApi($req);
    }

    private static function getApi($req)
    {
        if (self::getIdsku($req) > 0) {
            return self::getWithIdsku($req);
        }

        return self::getWithOutIdsku($req);
    }

    private static function getWithIdsku($req, $idSku = null)
    {
        $sku = null != $idSku ? $idSku : self::getIdsku($req);
        $endPoint = 'https://store.sony.com.br/produto/sku/'.$sku;

        $response = Http::get($endPoint ?? null);
        $body = $response->json();
        $res = current($body);

        return [
            'titulo' => $res['Name'],
            'valor' => $res['Price'],
            'imagem' => $res['Images'][0][0]['Path'] ?? null,
        ];
    }

    private static function getWithOutIdsku($req)
    {
        $response = Http::get($req['link']);
        $body = $response->body();

        $body = trim(preg_replace('/\s\s+/', ' ', $body));

        preg_match('/skus":.*",/', $body, $sku);
        $sku = strip_tags($sku[0] ?? null);
        $sku = explode(':', $sku)[1] ?? null;
        $sku = explode(',', $sku)[0] ?? null;
        $sku = str_replace(["'", '"'], '', $sku);

        return self::getWithIdsku(null, $sku);
    }

    private static function getIdsku($req)
    {
        $url = explode('idsku=', $req['link']);

        return explode('&', $url[1] ?? null)[0] ?? null;
    }

    private static function getSkuFilter($req)
    {
        $url = explode('br/', $req['link']);

        return strtoupper(explode('/', $url[1] ?? null)[0]);
    }
}
