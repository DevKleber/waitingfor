import { Injectable } from '@angular/core';
import { NotificationService } from './shared/messages/notification.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class Helper {
	constructor(
		private notificationService: NotificationService,
		private sanitizer: DomSanitizer
	) {}
	typeFile = {
		image: ['jpg', 'png', 'jpeg', 'svg'],
		document: [
			'pdf',
			'msword',
			'vnd.oasis.opendocument.text',
			'vnd.openxmlformats-officedocument.wordprocessingml.document',
			'vnd.ms-excel',
		],
	};

	retira_acentos(string) {
		return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	}

	getTime() {
		var date = new Date();

		var seconds = String(date.getSeconds()).padStart(2, '0');
		var minutes = String(date.getMinutes()).padStart(2, '0');
		var hour = String(date.getHours()).padStart(2, '0');

		return `${hour}:${minutes}:${seconds}`;
	}
	getTimestampNow() {
		var date = new Date();

		var dd = String(date.getDate()).padStart(2, '0');
		var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = date.getFullYear();

		var seconds = String(date.getSeconds()).padStart(2, '0');
		var minutes = String(date.getMinutes()).padStart(2, '0');
		var hour = String(date.getHours()).padStart(2, '0');

		return `${yyyy}-${mm}-${dd} ${hour}:${minutes}:${seconds}`;
	}

	formBuilderValidatorsEmail() {
		return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	}
	validaCPFCNPJ(cpfcnpj) {
		var cpfcnpjJustNumbers = cpfcnpj.replace(/\D/g, '');

		if (cpfcnpjJustNumbers.length == 11) {
			var cpf = cpfcnpjJustNumbers;
			if (
				!cpf ||
				cpf.length != 11 ||
				cpf == '00000000000' ||
				cpf == '11111111111' ||
				cpf == '22222222222' ||
				cpf == '33333333333' ||
				cpf == '44444444444' ||
				cpf == '55555555555' ||
				cpf == '66666666666' ||
				cpf == '77777777777' ||
				cpf == '88888888888' ||
				cpf == '99999999999'
			)
				return false;
			var soma = 0;
			var resto;
			for (var i = 1; i <= 9; i++)
				soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
			resto = (soma * 10) % 11;
			if (resto == 10 || resto == 11) resto = 0;
			if (resto != parseInt(cpf.substring(9, 10))) return false;
			soma = 0;
			for (var i = 1; i <= 10; i++)
				soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
			resto = (soma * 10) % 11;
			if (resto == 10 || resto == 11) resto = 0;
			if (resto != parseInt(cpf.substring(10, 11))) return false;
			return true;
		} else if (cpfcnpjJustNumbers.length == 14) {
			var cnpj = cpfcnpjJustNumbers;
			if (
				!cnpj ||
				cnpj.length != 14 ||
				cnpj == '00000000000000' ||
				cnpj == '11111111111111' ||
				cnpj == '22222222222222' ||
				cnpj == '33333333333333' ||
				cnpj == '44444444444444' ||
				cnpj == '55555555555555' ||
				cnpj == '66666666666666' ||
				cnpj == '77777777777777' ||
				cnpj == '88888888888888' ||
				cnpj == '99999999999999'
			)
				return false;
			var tamanho = cnpj.length - 2;
			var numeros = cnpj.substring(0, tamanho);
			var digitos = cnpj.substring(tamanho);
			var soma = 0;
			var pos = tamanho - 7;
			for (var i = tamanho; i >= 1; i--) {
				soma += numeros.charAt(tamanho - i) * pos--;
				if (pos < 2) pos = 9;
			}
			var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
			if (resultado != digitos.charAt(0)) return false;
			tamanho = tamanho + 1;
			numeros = cnpj.substring(0, tamanho);
			soma = 0;
			pos = tamanho - 7;
			for (var i = tamanho; i >= 1; i--) {
				soma += numeros.charAt(tamanho - i) * pos--;
				if (pos < 2) pos = 9;
			}
			resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
			if (resultado != digitos.charAt(1)) return false;
			return true;
		}
	}

	extensoesProibidas(event) {
		let extensao = this.getExtensionOfFile(event.target.files[0].name);
		var deny = [
			'html',
			'exe',
			'js',
			'py',
			'php',
			'cc',
			'cpp',
			'cxx',
			'c',
			'c++',
			'h',
			'hh',
			'hpp',
			'hxx',
			'h++',
			'c++',
			'jar',
			'java',
			'deb',
			'tar',
			'zip',
		];
		return deny.indexOf(extensao.toLowerCase()) > -1;
	}
	extensoesValidasAnexos(event) {
		let extensao = this.getExtensionOfFile(event.target.files[0].name);
		var days = [
			'pdf',
			'png',
			'jpg',
			'jpeg',
			,
			'doc',
			'docs',
			'docx',
			'xlsx',
			'xls',
		];
		return days.indexOf(extensao.toLowerCase()) > -1;
	}
	getExtensionOfFile(name) {
		return name.split('.').pop();
	}

	onFileChangedAll(event, type = 'image') {
		let findFile = false;

		if (event.target.files[0] == undefined) {
			return false;
		}
		// console.log(event.target.files);
		var selectedFile: any[] = [];
		var urlImg: any[] = [];
		for (let file of event.target.files) {
			for (let ext of this.typeFile[type]) {
				if (file.type.includes(ext)) {
					findFile = true;
					let tmppath = URL.createObjectURL(file);
					urlImg.push(this.sanitizer.bypassSecurityTrustUrl(tmppath));
					selectedFile.push(file);
				}
			}
		}
		if (!findFile) {
			return false;
		}
		// console.log(selectedFile);

		if (selectedFile.length == 1) {
			const selectF = selectedFile.shift();
			const urlI = urlImg.shift();
			return { selectedFile: selectF, urlImg: urlI };
		}
		return { selectedFile, urlImg };
	}
	onFileChanged(event) {
		if (this.extensoesProibidas(event)) {
			this.notificationService.notifySweet('Arquivo Proibido');
			return false;
		}
		var tmppath = URL.createObjectURL(event.target.files[0]);
		let extensao = this.getExtensionOfFile(event.target.files[0].name);
		let img;
		switch (extensao) {
			case 'png':
			case 'jpg':
			case 'jpeg':
				img = tmppath;
				break;
			default:
				img = '/assets/img/file/' + extensao + '.svg';
				break;
		}
		let selectedFile = event.target.files[0];
		let dados: object = { img: img, selectedFile: selectedFile };

		return dados;
	}
	onFileSet(no_documento) {
		let extensao = this.getExtensionOfFile(no_documento);
		let img;
		switch (extensao) {
			case 'png':
			case 'jpg':
			case 'jpeg':
				img = no_documento;
				break;
			default:
				img = '/assets/img/file/' + extensao + '.svg';
				break;
		}
		return img;
	}

	formatarDataParaCompararNoBanco(data) {
		if (data) {
			let dia = data.getDate().toString();
			let diaF = dia.length == 1 ? '0' + dia : dia;
			let mes = (data.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
			let mesF = mes.length == 1 ? '0' + mes : mes;
			let anoF = data.getFullYear();
			return anoF + '-' + mesF + '-' + diaF;
		}
	}

	encrypt(dados) {
		dados = dados.replace(/A/g, 'গ');
		dados = dados.replace(/B/g, 'খ');
		dados = dados.replace(/C/g, 'ক');
		dados = dados.replace(/D/g, 'ঔ');
		dados = dados.replace(/E/g, 'ও');
		dados = dados.replace(/F/g, 'ঐ');
		dados = dados.replace(/G/g, 'এ');
		dados = dados.replace(/H/g, 'ঌ');
		dados = dados.replace(/I/g, 'ঋ');
		dados = dados.replace(/J/g, 'ঊ');
		dados = dados.replace(/K/g, 'উ');
		dados = dados.replace(/L/g, 'ঈ');
		dados = dados.replace(/M/g, 'ই');
		dados = dados.replace(/N/g, 'আ');
		dados = dados.replace(/O/g, 'অ');
		dados = dados.replace(/P/g, 'ॿ');
		dados = dados.replace(/Q/g, 'ॾ');
		dados = dados.replace(/R/g, 'ॼ');
		dados = dados.replace(/S/g, 'ॻ');
		dados = dados.replace(/T/g, 'ॲ');
		dados = dados.replace(/U/g, '९');
		dados = dados.replace(/V/g, '७');
		dados = dados.replace(/W/g, 'ॠ');
		dados = dados.replace(/X/g, 'ॡ');
		dados = dados.replace(/Y/g, 'फ़');
		dados = dados.replace(/Z/g, 'ॐ');

		dados = dados.replace(/a/g, 'अ');
		dados = dados.replace(/b/g, 'आ');
		dados = dados.replace(/c/g, 'इ');
		dados = dados.replace(/d/g, 'ई');

		dados = dados.replace(/e/g, 'उ');
		dados = dados.replace(/f/g, 'ऊ');
		dados = dados.replace(/g/g, 'ऋ');
		dados = dados.replace(/h/g, 'ऌ');
		dados = dados.replace(/i/g, 'ऍ');
		dados = dados.replace(/j/g, 'ऎ');
		dados = dados.replace(/k/g, 'ए');
		dados = dados.replace(/l/g, 'ऐ');
		dados = dados.replace(/m/g, 'ঙ');
		dados = dados.replace(/n/g, 'ঘ');
		dados = dados.replace(/o/g, 'ओ');
		dados = dados.replace(/p/g, 'औ');
		dados = dados.replace(/q/g, 'क');
		dados = dados.replace(/r/g, 'ख');
		dados = dados.replace(/s/g, 'ग');
		dados = dados.replace(/t/g, 'घ');
		dados = dados.replace(/u/g, 'ङ');
		dados = dados.replace(/v/g, 'च');
		dados = dados.replace(/w/g, 'छ');
		dados = dados.replace(/x/g, 'ज');
		dados = dados.replace(/y/g, 'झ');
		dados = dados.replace(/z/g, 'ञ');

		dados = dados.replace(/á/g, 'ट');
		dados = dados.replace(/é/g, 'य');
		dados = dados.replace(/í/g, 'म');
		dados = dados.replace(/ó/g, 'भ');
		dados = dados.replace(/ú/g, 'ब');

		dados = dados.replace(/à/g, 'फ');
		dados = dados.replace(/è/g, 'प');
		dados = dados.replace(/ì/g, 'ऩ');
		dados = dados.replace(/ò/g, 'न');
		dados = dados.replace(/ù/g, 'ध');

		dados = dados.replace(/ã/g, 'द');
		dados = dados.replace(/õ/g, 'थ');

		dados = dados.replace(/ç/g, 'त');

		dados = dados.replace(/ê/g, 'ण');

		dados = dados.replace(/ /g, '߷');

		dados = dados.replace(/"/g, 'रू');
		dados = dados.replace(/{/g, 'कु');
		dados = dados.replace(/}/g, 'ञ्');
		dados = dados.replace(/:/g, 'बा');
		dados = dados.replace(/,/g, 'र');

		return dados;
	}
	decrypt(dados) {
		if (dados == null) return {};
		var result;
		dados = dados.replace(/গ/g, 'A');
		dados = dados.replace(/খ/g, 'B');
		dados = dados.replace(/ক/g, 'C');
		dados = dados.replace(/ঔ/g, 'D');
		dados = dados.replace(/ও/g, 'E');
		dados = dados.replace(/ঐ/g, 'F');
		dados = dados.replace(/এ/g, 'G');
		dados = dados.replace(/ঌ/g, 'H');
		dados = dados.replace(/ঋ/g, 'I');
		dados = dados.replace(/ঊ/g, 'J');
		dados = dados.replace(/উ/g, 'K');
		dados = dados.replace(/ঈ/g, 'L');
		dados = dados.replace(/ই/g, 'M');
		dados = dados.replace(/আ/g, 'N');
		dados = dados.replace(/অ/g, 'O');
		dados = dados.replace(/ॿ/g, 'P');
		dados = dados.replace(/ॾ/g, 'Q');
		dados = dados.replace(/ॼ/g, 'R');
		dados = dados.replace(/ॻ/g, 'S');
		dados = dados.replace(/ॲ/g, 'T');
		dados = dados.replace(/९/g, 'U');
		dados = dados.replace(/७/g, 'V');
		dados = dados.replace(/ॠ/g, 'W');
		dados = dados.replace(/ॡ/g, 'X');
		dados = dados.replace(/फ़/g, 'Y');
		dados = dados.replace(/ॐ/g, 'Z');

		dados = dados.replace(/अ/g, 'a');
		dados = dados.replace(/आ/g, 'b');
		dados = dados.replace(/इ/g, 'c');
		dados = dados.replace(/ई/g, 'd');
		dados = dados.replace(/उ/g, 'e');
		dados = dados.replace(/ऊ/g, 'f');
		dados = dados.replace(/ऋ/g, 'g');
		dados = dados.replace(/ऌ/g, 'h');
		dados = dados.replace(/ऍ/g, 'i');
		dados = dados.replace(/ऎ/g, 'j');
		dados = dados.replace(/ए/g, 'k');
		dados = dados.replace(/ऐ/g, 'l');
		dados = dados.replace(/ঙ/g, 'm');
		dados = dados.replace(/ঘ/g, 'n');
		dados = dados.replace(/ओ/g, 'o');
		dados = dados.replace(/औ/g, 'p');
		dados = dados.replace(/क/g, 'q');
		dados = dados.replace(/ख/g, 'r');
		dados = dados.replace(/ग/g, 's');
		dados = dados.replace(/घ/g, 't');
		dados = dados.replace(/ङ/g, 'u');
		dados = dados.replace(/च/g, 'v');
		dados = dados.replace(/छ/g, 'w');
		dados = dados.replace(/ज/g, 'x');
		dados = dados.replace(/झ/g, 'y');
		dados = dados.replace(/ञ/g, 'z');

		dados = dados.replace(/ट/g, 'á');
		dados = dados.replace(/य/g, 'é');
		dados = dados.replace(/म/g, 'í');
		dados = dados.replace(/भ/g, 'ó');
		dados = dados.replace(/ब/g, 'ú');

		dados = dados.replace(/फ/g, 'à');
		dados = dados.replace(/प/g, 'è');
		dados = dados.replace(/ऩ/g, 'ì');
		dados = dados.replace(/न/g, 'ò');
		dados = dados.replace(/ध/g, 'ù');

		dados = dados.replace(/द/g, 'ã');
		dados = dados.replace(/थ/g, 'õ');

		dados = dados.replace(/त/g, 'ç');

		dados = dados.replace(/ण/g, 'ê');

		dados = dados.replace(/߷/g, ' ');

		dados = dados.replace(/Գ/g, '0');
		dados = dados.replace(/Բ/g, '1');
		dados = dados.replace(/Ա/g, '2');
		dados = dados.replace(/Ѿ/g, '3');
		dados = dados.replace(/Ѽ/g, '4');
		dados = dados.replace(/Ϫ/g, '5');
		dados = dados.replace(/ϟ/g, '6');
		dados = dados.replace(/ƨ/g, '7');
		dados = dados.replace(/Ʀ/g, '8');
		dados = dados.replace(/ƣ/g, '9');

		dados = dados.replace(/रू/g, '"');
		dados = dados.replace(/कु/g, '{');
		dados = dados.replace(/ञ्/g, '}');
		dados = dados.replace(/बा/g, ':');
		dados = dados.replace(/र/g, ',');

		return dados;
	}
	getAllCountryCode() {
		return [
			{ mask: '', countryCode: '93', nome: 'Afeganistão' },
			{ mask: '', countryCode: '355', nome: 'Albânia' },
			{ mask: '', countryCode: '213', nome: 'Algéria' },
			{ mask: '', countryCode: '1684', nome: 'Samoa Americana' },
			{ mask: '', countryCode: '376', nome: 'Andorra' },
			{ mask: '', countryCode: '244', nome: 'Angola' },
			{ mask: '', countryCode: '1264', nome: 'Anguilla' },
			{ mask: '', countryCode: '672', nome: 'Antártida' },
			{ mask: '', countryCode: '1268', nome: 'Antigua e Barbuda' },
			{ mask: '000 0000-0000', countryCode: '54', nome: 'Argentina' },
			{ mask: '', countryCode: '374', nome: 'Armênia' },
			{ mask: '', countryCode: '297', nome: 'Aruba' },
			{ mask: '(00) 0000 0000', countryCode: '61', nome: 'Austrália' },
			{ mask: '0000 000000', countryCode: '43', nome: 'Áustria' },
			{ mask: '', countryCode: '994', nome: 'Azerbaijão' },
			{ mask: '', countryCode: '1242', nome: 'Bahamas' },
			{ mask: '', countryCode: '973', nome: 'Bahrein' },
			{ mask: '', countryCode: '880', nome: 'Bangladesh' },
			{ mask: '', countryCode: '246', nome: 'Barbados' },
			{ mask: '', countryCode: '375', nome: 'Bielorrússia' },
			{ mask: '00 000 00 00', countryCode: '032', nome: 'Bélgica' },
			{ mask: '', countryCode: '501', nome: 'Belize' },
			{ mask: '', countryCode: '229', nome: 'Benin' },
			{ mask: '', countryCode: '1441', nome: 'Bermuda' },
			{ mask: '', countryCode: '975', nome: 'Butão' },
			{ mask: '', countryCode: '591', nome: 'Bolívia' },
			{ mask: '', countryCode: '387', nome: 'Bósnia e Herzegovina' },
			{ mask: '', countryCode: '267', nome: 'Botswana' },
			{ mask: '', countryCode: '47', nome: 'Ilha Bouvet' },
			{ mask: '(00)00000-0000', countryCode: '55', nome: 'Brasil' },
			{
				mask: '',
				countryCode: '246',
				nome: 'Território Britânico do Oceano Índico',
			},
			{ mask: '', countryCode: '673', nome: 'Brunei' },
			{ mask: '00 000 0000', countryCode: '359', nome: 'Bulgária' },
			{ mask: '', countryCode: '226', nome: 'Burkina Faso' },
			{ mask: '', countryCode: '257', nome: 'Burundi' },
			{ mask: '', countryCode: '855', nome: 'Camboja' },
			{ mask: '', countryCode: '237', nome: 'Camarões' },
			{ mask: '(000) 000-0000', countryCode: '1', nome: 'Canadá' },
			{ mask: '', countryCode: '238', nome: 'Cabo Verde' },
			{ mask: '', countryCode: '1345', nome: 'Ilhas Cayman' },
			{ mask: '', countryCode: '236', nome: 'República Centro-Africana' },
			{ mask: '', countryCode: '235', nome: 'Chade' },
			{ mask: '', countryCode: '56', nome: 'Chile' },
			{ mask: '', countryCode: '86', nome: 'China' },
			{ mask: '', countryCode: '61', nome: 'Ilha Christmas' },
			{ mask: '', countryCode: '672', nome: 'Ilhas Cocos (Keeling)' },
			{ mask: '(0) 0000000', countryCode: '57', nome: 'Colômbia' },
			{ mask: '', countryCode: '269', nome: 'Comores' },
			{ mask: '', countryCode: '242', nome: 'Congo' },
			{ mask: '', countryCode: '242', nome: 'Congo (DR)' },
			{ mask: '', countryCode: '682', nome: 'Ilhas Cook' },
			{ mask: '', countryCode: '506', nome: 'Costa Rica' },
			{ mask: '', countryCode: '225', nome: 'Costa do Marfim' },
			{ mask: '', countryCode: '385', nome: 'Croácia' },
			{ mask: '', countryCode: '53', nome: 'Cuba' },
			{ mask: '', countryCode: '357', nome: 'Chipre' },
			{ mask: '', countryCode: '420', nome: 'República Tcheca' },
			{ mask: '', countryCode: '45', nome: 'Dinamarca' },
			{ mask: '', countryCode: '253', nome: 'Djibuti' },
			{ mask: '', countryCode: '1767', nome: 'Dominica' },
			{ mask: '', countryCode: '1809', nome: 'República Dominicana' },
			{ mask: '', countryCode: '593', nome: 'Equador' },
			{ mask: '', countryCode: '20', nome: 'Egito' },
			{ mask: '', countryCode: '503', nome: 'El Salvador' },
			{ mask: '', countryCode: '240', nome: 'Guiné Equatorial' },
			{ mask: '', countryCode: '291', nome: 'Eritreia' },
			{ mask: '', countryCode: '372', nome: 'Estônia' },
			{ mask: '', countryCode: '251', nome: 'Etiópia' },
			{ mask: '', countryCode: '500', nome: 'Ilhas Malvinas' },
			{ mask: '', countryCode: '298', nome: 'Ilhas Faroe' },
			{ mask: '', countryCode: '679', nome: 'Fiji' },
			{ mask: '', countryCode: '358', nome: 'Finlândia' },
			{ mask: '0 00 00 00 00', countryCode: '33', nome: 'França' },
			{ mask: '', countryCode: '594', nome: 'Guiana Francesa' },
			{ mask: '', countryCode: '689', nome: 'Polinésia Francesa' },
			{
				mask: '',
				countryCode: '33',
				nome: 'Terras Austrais e Antárticas Francesas',
			},
			{ mask: '', countryCode: '241', nome: 'Gabão' },
			{ mask: '', countryCode: '220', nome: 'Gâmbia' },
			{ mask: '', countryCode: '995', nome: 'Geórgia' },
			{ mask: '000 00000000', countryCode: '49', nome: 'Alemanha' },
			{ mask: '', countryCode: '233', nome: 'Gana' },
			{ mask: '', countryCode: '350', nome: 'Gibraltar' },
			{ mask: '', countryCode: '30', nome: 'Grécia' },
			{ mask: '', countryCode: '299', nome: 'Groelândia' },
			{ mask: '', countryCode: '1473', nome: 'Granada' },
			{ mask: '', countryCode: '590', nome: 'Guadalupe' },
			{ mask: '', countryCode: '1671', nome: 'Guão' },
			{ mask: '', countryCode: '502', nome: 'Guatemala' },
			{ mask: '', countryCode: '224', nome: 'Guiné' },
			{ mask: '', countryCode: '245', nome: 'Guiné-Bissau' },
			{ mask: '', countryCode: '592', nome: 'Guiana' },
			{ mask: '', countryCode: '509', nome: 'Haiti' },
			{ mask: '', countryCode: '672', nome: 'Ilhas Heard e McDonald' },
			{ mask: '', countryCode: '39', nome: 'Vaticano' },
			{ mask: '', countryCode: '504', nome: 'Honduras' },
			{ mask: '', countryCode: '852', nome: 'Hong Kong' },
			{ mask: '', countryCode: '36', nome: 'Hungria' },
			{ mask: '', countryCode: '354', nome: 'Islândia' },
			{ mask: '', countryCode: '91', nome: 'Índia' },
			{ mask: '', countryCode: '62', nome: 'Indonésia' },
			{ mask: '', countryCode: '98', nome: 'Iran' },
			{ mask: '', countryCode: '964', nome: 'Iraque' },
			{ mask: '', countryCode: '353', nome: 'Irlanda' },
			{ mask: '', countryCode: '972', nome: 'Israel' },
			{ mask: '', countryCode: '39', nome: 'Italia' },
			{ mask: '', countryCode: '1876', nome: 'Jamaica' },
			{ mask: '', countryCode: '81', nome: 'Japão' },
			{ mask: '', countryCode: '962', nome: 'Jornânia' },
			{ mask: '', countryCode: '7', nome: 'Cazaquistão' },
			{ mask: '', countryCode: '254', nome: 'Quênia' },
			{ mask: '', countryCode: '686', nome: 'Kiribati' },
			{ mask: '', countryCode: '850', nome: 'Coreia do Norte' },
			{ mask: '', countryCode: '82', nome: 'Coreia do Sul' },
			{ mask: '', countryCode: '965', nome: 'Kuwait' },
			{ mask: '', countryCode: '996', nome: 'Quirguistão' },
			{ mask: '', countryCode: '856', nome: 'Laos' },
			{ mask: '', countryCode: '371', nome: 'Letônia' },
			{ mask: '', countryCode: '961', nome: 'Líbano' },
			{ mask: '', countryCode: '266', nome: 'Lesoto' },
			{ mask: '', countryCode: '231', nome: 'Libéria' },
			{ mask: '', countryCode: '218', nome: 'Líbia' },
			{ mask: '', countryCode: '423', nome: 'Liechtenstein' },
			{ mask: '', countryCode: '370', nome: 'Lituânia' },
			{ mask: '', countryCode: '352', nome: 'Luxemburgo' },
			{ mask: '', countryCode: '853', nome: 'Macao' },
			{ mask: '', countryCode: '389', nome: 'Macedônia' },
			{ mask: '', countryCode: '261', nome: 'Madagascar' },
			{ mask: '', countryCode: '265', nome: 'Malawi' },
			{ mask: '', countryCode: '60', nome: 'Malásia' },
			{ mask: '', countryCode: '960', nome: 'Maldivas' },
			{ mask: '', countryCode: '223', nome: 'Mali' },
			{ mask: '', countryCode: '356', nome: 'Malta' },
			{ mask: '', countryCode: '692', nome: 'Ilhas Marshall' },
			{ mask: '', countryCode: '596', nome: 'Martinica' },
			{ mask: '', countryCode: '222', nome: 'Mauritânia' },
			{ mask: '', countryCode: '230', nome: 'Maurício' },
			{ mask: '', countryCode: '269', nome: 'Mayotte' },
			{ mask: '', countryCode: '52', nome: 'México' },
			{ mask: '', countryCode: '691', nome: 'Micronésia' },
			{ mask: '', countryCode: '373', nome: 'Moldova' },
			{ mask: '', countryCode: '377', nome: 'Mônaco' },
			{ mask: '', countryCode: '976', nome: 'Mongólia' },
			{ mask: '', countryCode: '1664', nome: 'Montserrat' },
			{ mask: '', countryCode: '212', nome: 'Marrocos' },
			{ mask: '', countryCode: '258', nome: 'Moçambique' },
			{ mask: '', countryCode: '95', nome: 'Birmânia' },
			{ mask: '', countryCode: '264', nome: 'Namíbia' },
			{ mask: '', countryCode: '674', nome: 'Nauru' },
			{ mask: '', countryCode: '977', nome: 'Nepal' },
			{ mask: '', countryCode: '31', nome: 'Holanda' },
			{ mask: '', countryCode: '599', nome: 'Antilhas Holandesas' },
			{ mask: '', countryCode: '687', nome: 'Nova Caledônia' },
			{ mask: '', countryCode: '64', nome: 'Nova Zelândia' },
			{ mask: '', countryCode: '505', nome: 'Nicarágua' },
			{ mask: '', countryCode: '227', nome: 'Niger' },
			{ mask: '', countryCode: '234', nome: 'Nigéria' },
			{ mask: '', countryCode: '683', nome: 'Niue' },
			{ mask: '', countryCode: '672', nome: 'Ilha Norfolk' },
			{ mask: '', countryCode: '1670', nome: 'Ilhas Marianas do Norte' },
			{ mask: '', countryCode: '47', nome: 'Noruega' },
			{ mask: '', countryCode: '968', nome: 'Omã' },
			{ mask: '', countryCode: '92', nome: 'Paquistão' },
			{ mask: '', countryCode: '680', nome: 'Palau' },
			{ mask: '', countryCode: '970', nome: 'Palestina' },
			{ mask: '', countryCode: '507', nome: 'Panamá' },
			{ mask: '', countryCode: '675', nome: 'Papua-Nova Guiné' },
			{ mask: '', countryCode: '595', nome: 'Paraguai' },
			{ mask: '', countryCode: '51', nome: 'Peru' },
			{ mask: '', countryCode: '63', nome: 'Filipinas' },
			{ mask: '', countryCode: '672', nome: 'Ilhas Picárnia' },
			{ mask: '', countryCode: '48', nome: 'Polônia' },
			{ mask: '000 000 000', countryCode: '351', nome: 'Portugal' },
			{ mask: '', countryCode: '1787', nome: 'Porto Rico' },
			{ mask: '', countryCode: '974', nome: 'Catar' },
			{ mask: '', countryCode: '262', nome: 'Reunião' },
			{ mask: '', countryCode: '40', nome: 'Romênia' },
			{ mask: '', countryCode: '70', nome: 'Rússia' },
			{ mask: '', countryCode: '250', nome: 'Ruanda' },
			{ mask: '', countryCode: '290', nome: 'Santa Helena' },
			{ mask: '', countryCode: '1869', nome: 'São Cristóvão' },
			{ mask: '', countryCode: '1758', nome: 'Santa Lúcia' },
			{ mask: '', countryCode: '508', nome: 'São Pedro e Miquelon' },
			{ mask: '', countryCode: '1784', nome: 'São Vicente e Granadinas' },
			{ mask: '', countryCode: '684', nome: 'Samoa' },
			{ mask: '', countryCode: '378', nome: 'São Marino' },
			{ mask: '', countryCode: '239', nome: 'Sao Tomé e Príncipe' },
			{ mask: '', countryCode: '966', nome: 'Arábia Saudita' },
			{ mask: '', countryCode: '221', nome: 'Senegal' },
			{ mask: '', countryCode: '381', nome: 'Sérvia e Montenegro' },
			{ mask: '', countryCode: '248', nome: 'Seicheles' },
			{ mask: '', countryCode: '232', nome: 'República da Serra Leoa' },
			{ mask: '', countryCode: '65', nome: 'Singapura' },
			{ mask: '', countryCode: '421', nome: 'Eslováquia' },
			{ mask: '', countryCode: '386', nome: 'Eslovênia' },
			{ mask: '', countryCode: '677', nome: 'Ilhas Salomão' },
			{ mask: '', countryCode: '252', nome: 'Somália' },
			{ mask: '', countryCode: '27', nome: 'África do Sul' },
			{
				mask: '',
				countryCode: '500',
				nome: 'Ilhas Geórgia do Sul e Sandwich do Sul',
			},
			{ mask: '000 00 00 00', countryCode: '34', nome: 'Espanha' },
			{ mask: '', countryCode: '94', nome: 'Sri Lanka' },
			{ mask: '', countryCode: '249', nome: 'Sudão' },
			{ mask: '', countryCode: '597', nome: 'Suriname' },
			{ mask: '', countryCode: '47', nome: 'Esvalbarde' },
			{ mask: '', countryCode: '268', nome: 'Suazilândia' },
			{ mask: '', countryCode: '46', nome: 'Suécia' },
			{ mask: '', countryCode: '41', nome: 'Suiça' },
			{ mask: '', countryCode: '963', nome: 'Síria' },
			{ mask: '', countryCode: '886', nome: 'Taiwan' },
			{ mask: '', countryCode: '992', nome: 'Tajiquistão' },
			{ mask: '', countryCode: '255', nome: 'Tanzânia' },
			{ mask: '', countryCode: '66', nome: 'Tailândia' },
			{ mask: '', countryCode: '670', nome: 'Timor-Leste' },
			{ mask: '', countryCode: '228', nome: 'Togo' },
			{ mask: '', countryCode: '690', nome: 'Toquelau' },
			{ mask: '', countryCode: '676', nome: 'Tonga' },
			{ mask: '', countryCode: '1868', nome: 'Trinidad e Tobago' },
			{ mask: '', countryCode: '216', nome: 'Tunísia' },
			{ mask: '', countryCode: '90', nome: 'Turquia' },
			{ mask: '', countryCode: '7370', nome: 'Turcomenistão' },
			{ mask: '', countryCode: '1649', nome: 'Ilhas Turks e Caicos' },
			{ mask: '', countryCode: '688', nome: 'Tuvalu' },
			{ mask: '', countryCode: '256', nome: 'Uganda' },
			{ mask: '', countryCode: '380', nome: 'Ucrânia' },
			{ mask: '', countryCode: '971', nome: 'Emirados Árabes' },
			{ mask: '00000 000000', countryCode: '44', nome: 'Reino Unido' },
			{
				mask: '(000) 000-0000',
				countryCode: '1',
				nome: 'Estados Unidos',
			},
			{ mask: '', countryCode: '598', nome: 'Uruguai' },
			{ mask: '', countryCode: '998', nome: 'Uzbequistão' },
			{ mask: '', countryCode: '678', nome: 'Vanuatu' },
			{ mask: '', countryCode: '58', nome: 'Venezuela' },
			{ mask: '', countryCode: '84', nome: 'Vietnam' },
			{ mask: '', countryCode: '1284', nome: 'Ilhas Virgens Inglesas' },
			{ mask: '', countryCode: '1340', nome: 'Ilhas Virgens (USA)' },
			{ mask: '', countryCode: '681', nome: 'Wallis e Futuna' },
			{ mask: '', countryCode: '212', nome: 'Saara Ocidental' },
			{ mask: '', countryCode: '967', nome: 'Iêmen' },
			{ mask: '', countryCode: '260', nome: 'Zâmbia' },
			{ mask: '', countryCode: '263', nome: 'Zimbábue' },
		];
	}
}
