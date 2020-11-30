<?php

namespace App\Http\Controllers;

use App\Library\Empresa;
use Helpers;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    public function index()
    {
        $produto = \App\Produto::where('id_user', auth('api')->user()->id)->get();
        if (!$produto) {
            return response(['response' => 'Não existe Produto'], 400);
        }
        $ar = [];
        foreach ($produto as $key => $value) {
            $text = Empresa::get($value);
            $ar[$key] = $text;
            $ar[$key]['valorSalvo'] = $value->vl_produto;
            $ar[$key]['link'] = $value->link;
            $ar[$key]['dominio'] = $value->dominio;
            $ar[$key]['id'] = $value->id;
        }

        return response(['dados' => $ar, 'empresas' => $this->getEmpresas()]);
    }

    public function getEmpresas()
    {
        return [
            'kabum.png',
            'magazineluiza.png',
            'amazon.png',
            'sony.png',
            'centralar.png',
            'aliexpress.png',
        ];
    }

    public function isOnSale()
    {
        $produto = \App\Produto::join('usuario', 'usuario.id', '=', 'produto.id_user')
            ->where('bo_email_desconto', true)
            ->where('vl_informardesconto_apartir', '>', 0)
            ->get()
        ;
        if (!$produto) {
            return response(['response' => 'Não existe Produto'], 400);
        }

        foreach ($produto as $key => $value) {
            $dataEmail['nome'] = $value->nome;
            $dataEmail['email'] = $value->email;
            $dataEmail['link'] = $value->link;
            $dataEmail['dominio'] = $value->dominio;
            $dataEmail['vl_produto'] = $value->vl_produto;
            $dataEmail['vl_informardesconto_apartir'] = $value->vl_informardesconto_apartir;

            $webCrawler = Empresa::get($value);
            $dataEmail['titulo'] = $webCrawler['titulo'];
            $dataEmail['valor'] = $webCrawler['valor'];
            $dataEmail['imagem'] = $webCrawler['imagem'];

            if ($value->vl_informardesconto_apartir >= $webCrawler['valor']) {
                \App\Email::isOnSale($dataEmail);
                $produtoItem = \App\Produto::find($value->id);
                $produtoItem->vl_informardesconto_apartir = ($value->vl_informardesconto_apartir - 1);
                $produtoItem->update();
            }
        }
    }

    public function store(Request $request)
    {
        $request['bo_ativo'] = true;
        $request['id_user'] = auth('api')->user()->id;

        $host = parse_url($request['link'])['host'];
        $explode = explode('.', $host) ?? null;
        $empresa = $explode[1];
        if ('store' == $explode[1]) {
            $empresa = $explode[2];
        }
        $request['dominio'] = $empresa;

        if (!$request['bo_email_desconto']) {
            $request['vl_informardesconto_apartir'] = null;
        }

        $produto = \App\Produto::create($request->all());
        if (!$produto) {
            return  response(['response' => 'Erro ao salvar Produto'], 400);
        }

        return response(['response' => 'Salvo com sucesso', 'dados' => $produto]);
    }

    public function show($id)
    {
        $produto = \App\Produto::find($id);
        if (!$produto) {
            return response(['response' => 'Não existe Produto'], 400);
        }

        return response($produto);
    }

    public function update(Request $request, $id)
    {
        $produto = \App\Produto::find($id);

        if (!$produto) {
            return response(['response' => 'Produto Não encontrado'], 400);
        }
        $produto = Helpers::processarColunasUpdate($produto, $request->all());

        if (!$produto->update()) {
            return response(['response' => 'Erro ao alterar'], 400);
        }

        return response(['response' => 'Atualizado com sucesso']);
    }

    public function destroy($id)
    {
        $produto = \App\Produto::find($id);

        if (!$produto) {
            return response(['response' => 'Produto Não encontrado'], 400);
        }
        if (!$produto->delete()) {
            return response(['response' => 'Erro ao deletar Produto'], 400);
        }

        return response(['response' => 'Produto Inativado com sucesso']);
    }
}
