import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'helpers',
})
export class HelpersPipe implements PipeTransform {
	transform(value: any, args?: any, args1?: any): any {
		return this.oquefazer(value, args, args1);
	}

	oquefazer(value: string, args: string, args1: string) {
		let texto = '';
		switch (args) {
			case 'isDevMode': {
				return this.isDevMode(value, args1);
				break;
			}
			case 'statusString': {
				return this.statusString(value);
				break;
			}
			case 'phoneByCountry': {
				return this.phoneByCountry(value, args1);
				break;
			}
			default: {
				break;
			}
		}
		return texto;
	}
	statusString(value) {
		if (value == undefined) {
			return;
		}
		const status = [
			{ id: 'pc', status: 'Problemas com cartão' },
			{ id: 'ld', status: 'Ligar depois' },
			{ id: 'n', status: 'Não tem interesse' },
			{ id: 'c', status: 'Comprou' },
			{ id: 'a', status: 'Aguardando seu telefonema' },
		];
		var result = status.filter(function (el) {
			return el.id == value;
		});
		if (result) {
			return result[0].status;
		}
	}

	isDevMode(value, isdev) {
		if (isdev) {
			return value.replace(/public\//g, '');
		}
		return value;
	}
	phoneByCountry(value, prefix) {
		var arPrefix = {
			1: { reg: /(\d{3})(\d{3})(\d{4})/, mask: '($1) $2-$3' },
			44: { reg: /(\d{5})(\d{6})/, mask: '$1 $2' },
			351: { reg: /(\d{3})(\d{3})(\d{3})/, mask: '$1 $2-$3' },
			33: {
				reg: /(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/,
				mask: '$1 $2 $3 $4 $5',
			},
			34: {
				reg: /(\d{3})(\d{2})(\d{2})(\d{2})/,
				mask: '$1 $2 $3 $4',
			},
			55: { reg: /(\d{2})(\d{5})(\d{4})/, mask: '($1) $2-$3' },
		};
		let ex = arPrefix[prefix];
		if (ex == undefined) return value;

		return value.replace(ex.reg, ex.mask);
	}
}
