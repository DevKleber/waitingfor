import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { NotificationService } from '../shared/messages/notification.service';
import { LoaderService } from '../shared/loader/loader.service';
import { Produto } from './produto.model';
import { ProdutoService } from './produto.service';
import { Helper } from '../helper';

import { Observable } from 'rxjs';

@Component({
	selector: 'app-produto',
	templateUrl: './produto.component.html',
	styleUrls: ['./produto.component.css'],
})
export class ProdutoComponent implements OnInit {
	produtos: Produto[];
	empresas: any[] = [];
	loader: boolean = true;
	form: FormGroup;

	timeToReLoadSeconds: number = 120;
	columns: any;

	@ViewChild('closeModal', { static: true }) closeModal: ElementRef;
	constructor(
		private produtoService: ProdutoService,
		private formBuilder: FormBuilder,
		private notificationService: NotificationService,
		private helper: Helper,
		public loaderService: LoaderService
	) {}

	ngOnInit() {
		this.initialForm();
		this.getProdutos();
		setInterval(() => {
			this.getProdutos();
		}, 1 * 1000 * this.timeToReLoadSeconds);
	}
	initialForm() {
		this.form = this.formBuilder.group({
			link: this.formBuilder.control(''),
			dominio: this.formBuilder.control(''),
			vl_produto: this.formBuilder.control(''),
			vl_informardesconto_apartir: this.formBuilder.control(''),
			bo_email_desconto: this.formBuilder.control(''),
			bo_email_disponibilidade: this.formBuilder.control(''),
			bo_disponibilidade: this.formBuilder.control(''),
			bo_eviadoemail_disponibilidade: this.formBuilder.control(''),
			bo_ativo: this.formBuilder.control(''),
			vl_com_desconto: this.formBuilder.control(''),
			id_user: this.formBuilder.control(''),
		});
	}

	getProdutos() {
		this.produtoService.getProdutos().subscribe((Produto) => {
			console.log(Produto);

			this.produtos = Produto['dados'];
			// this.empresas = Produto['empresas'];
			this.loaderService.isLoad(false);
			this.loader = false;
		});
	}

	deletar(produto) {
		Swal.fire({
			title: `Deletar ${produto.titulo}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim, deletar!',
		}).then((result) => {
			if (result.isConfirmed) {
				this.produtoService.inativar(produto.id).subscribe((data) => {
					if (data['response']) {
						produto.bo_ativo = 0;
						// this.produtos.splice(this.produtos.indexOf(produto),1)
						this.notificationService.notifySweet(
							`Produto deletado`
						);
					}
					this.getProdutos();
				});
			}
		});
	}

	update(form) {
		this.produtoService.update(form, form.id);
	}
	save(form) {
		this.produtoService.save(form).subscribe((res) => {
			this.closeModal.nativeElement.click();
			this.getProdutos();
		});
	}
}
