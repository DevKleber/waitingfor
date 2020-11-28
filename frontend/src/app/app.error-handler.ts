import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationService } from './shared/messages/notification.service';
import { LoaderService } from './shared/loader/loader.service';
import { LoginService } from './security/login/login.service';
import { Router } from '@angular/router';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
	constructor(
		private ns: NotificationService,
		private loaderService: LoaderService,
		private injector: Injector,
		private zone: NgZone
	) {
		super();
	}

	handleError(errorResponse: HttpErrorResponse | any) {
		this.loaderService.isLoad(false);

		if (errorResponse instanceof HttpErrorResponse) {
			const error =
				typeof errorResponse.error !== 'object'
					? JSON.parse(errorResponse.error)
					: errorResponse.error;
			this.zone.run(() => {
				// console.log('logo error handler', errorResponse.status);
				// console.log('logo error handler', errorResponse.error);
				// console.log('logo error handler', error.error);

				switch (errorResponse.status) {
					case 0:
						// this.ns.notifyError("token expirado");
						const loginService = this.injector.get(LoginService);
						loginService.logoutForce();
						break;
					case 400:
						console.log(error);
						if (
							error.error === 'token_expired' ||
							error.error == 'Token is Expired' ||
							error.error === 'token_invalid' ||
							error.error === 'A token is required' ||
							error.error === 'token_not_provider' ||
							error.error === 'Authorization Token not found'
						) {
							if (
								error.error != 'Authorization Token not found'
							) {
								this.ns.notifyError(error.error);
							}
							this.loaderService.isLoad(false);
							const loginService = this.injector.get(
								LoginService
							);
							// loginService.logout();
							loginService.logoutForce();
						} else {
							let erro =
								error.response != undefined
									? error.response
									: error.error;
							this.ns.notifyError(erro);
						}
						break;
					case 401:
						if (error.error === 'token_has_been_blacklisted') {
							this.ns.notifyError('token na lista negra');
							const loginService = this.injector.get(
								LoginService
							);
							loginService.logout();
							this.goToLogin();
						} else if (error.error === 'token_invalid') {
							this.ns.notifyError('Token Inválido');
							const loginService = this.injector.get(
								LoginService
							);
							loginService.logout();
							this.goToLogin('login');
						} else {
							this.ns.notifyError(error.response);
							if (!error.permission) {
								let router = this.injector.get(Router);
								this.goToLogin('');
								// history.go(-1);
							}
						}
						break;
					case 403:
						console.log('error 403');
						this.ns.notifyError(error || 'Não autorizado.');
						break;
					case 404:
						console.log('error 404');
						this.ns.notifyError(
							error ||
								'Recurso não encontrado. Verifique o console para mais detalhes'
						);
						break;
					case 408:
						this.ns.notifyError('tempo fim');
						break;
					case 500:
						let erro =
							error.message != undefined
								? error.message
								: error.error;
						console.log(error.message);
						this.ns.notifyError(
							' Erro interno no servidor! \n' + erro
						);
						break;
				}
			});
		}
		super.handleError(errorResponse);
	}
	goToLogin(path?) {
		const router = this.injector.get(Router);
		router.navigate([`/${path}`]);
	}
}
