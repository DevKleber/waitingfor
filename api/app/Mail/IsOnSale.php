<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class IsOnSale extends Mailable
{
    use Queueable;
    use SerializesModels;

    protected $produto;

    /**
     * Create a new message instance.
     *
     * @param mixed $produto
     */
    public function __construct($produto)
    {
        $this->produto = $produto;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.isOnSale')->subject('Produto em oferta na(o)'.$this->produto['dominio'])->with([
            'produto' => $this->produto,
        ]);
    }
}
