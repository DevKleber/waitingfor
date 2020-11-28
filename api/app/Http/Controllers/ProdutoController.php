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

        return response(['dados' => $ar]);
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
