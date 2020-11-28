import { NgModule, ModuleWithProviders, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';

import { SnackbarComponent } from './messages/snackbar/snackbar.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationService } from './messages/notification.service';
import { LoginService } from '../security/login/login.service';
import { LoggedInGuard } from '../security/loggedin.guard';
import { AuthInterceptor } from '../security/auth.interceptor';
import { AuthRefreshtokenInterceptor } from '../security/auth-refresh-token.interceptor';
// import {RefreshTokenInterceptor }from '../security/refresh-token.interceptor'

import { BrowserModule } from '@angular/platform-browser';

// pipes

import { Helper } from '../helper';

import { BooleanMessagePipe } from '../pipes/boolean-message.pipe';
import { SafeHtml } from '../pipes/safe-html.pipe';
import { HelpersPipe } from '../pipes/helpers.pipe';
import { Nl2BrPipe } from '../pipes/nl2br.pipe';

import { NgSelectModule } from '@ng-select/ng-select';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true,
};
export function playerFactory() {
	return player;
}

@NgModule({
	declarations: [
		SafeHtml,
		InputComponent,
		RadioComponent,
		SnackbarComponent,
		HelpersPipe,
		BooleanMessagePipe,
		Nl2BrPipe,
	],

	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgSelectModule,
		MatTooltipModule,
		MatMenuModule,
		PerfectScrollbarModule,
		NgxMaskModule.forRoot(),
		CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory,
		}),
		LottieModule.forRoot({ player: playerFactory }),
	],
	exports: [
		SafeHtml,
		InputComponent,
		RadioComponent,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SnackbarComponent,
		HelpersPipe,
		BooleanMessagePipe,
		Nl2BrPipe,
		NgSelectModule,
		MatTooltipModule,
		MatMenuModule,
		PerfectScrollbarModule,
		NgxMaskModule,
		CalendarModule,
		LottieModule,
	],
})
export class SharedModule {
	static forRoot(): ModuleWithProviders<SharedModule> {
		return {
			ngModule: SharedModule,
			providers: [
				NotificationService,
				LoginService,
				LoggedInGuard,
				Helper,
				{ provide: LOCALE_ID, useValue: 'pt-br' },
				{
					provide: HTTP_INTERCEPTORS,
					useClass: AuthInterceptor,
					multi: true,
				},
				// {provide:HTTP_INTERCEPTORS, useClass: AuthRefreshtokenInterceptor, multi:true},
				{
					provide: PERFECT_SCROLLBAR_CONFIG,
					useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
				},
			],
		};
	}
}
