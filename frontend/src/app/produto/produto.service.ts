import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';

import { Produto } from './produto.model';

import { NotificationService } from '../shared/messages/notification.service';
import { API } from '../app.api';

@Injectable({
	providedIn: 'root',
})
export class ProdutoService {
	constructor(
		private http: HttpClient,
		private notificationService: NotificationService,
		private router: Router
	) {}

	getProdutos(search?: string): Observable<Produto[]> {
		return this.http.get<Produto[]>(`${API}/produto`);
	}

	getprodutoById(id: string): Observable<Produto> {
		return this.http.get<Produto>(`${API}/produto/${id}`);
	}

	save(form) {
		return this.http.post<any>(`${API}/produto`, form);
	}

	update(form, id) {
		return this.http.put(`${API}/produto/${id}`, form).subscribe(
			(data) => {
				if (data['response']) {
					this.notify('Registro Alterado Com Sucesso!');
					this.router.navigate(['/produto']);
				}
				console.log(data);
			},
			(error) => {
				this.notify(`Error: ${error}`);
			}
		);
	}
	inativar(id: string) {
		return this.http.delete(`${API}/produto/${id}`);
	}

	notify(msg) {
		this.notificationService.notifySweet(msg);
	}
	goTo(path: string = 'depoimento') {
		this.router.navigate([`/${path}`]);
	}
}
