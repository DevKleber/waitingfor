<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    protected $table = "produto";
    protected $primaryKey   = "id";
    protected $fillable = ['link','dominio','vl_produto','vl_informardesconto_apartir','bo_email_desconto','bo_email_disponibilidade','bo_disponibilidade','bo_eviadoemail_disponibilidade','bo_ativo','vl_com_desconto','id_user','created_at','updated_at']; 
} 
