export class Produto {
	constructor(
		public id: number,
		public link: string,
		public dominio: string,
		public vl_produto: number,
		public vl_informardesconto_apartir: number,
		public bo_email_desconto: boolean,
		public bo_email_disponibilidade: boolean,
		public bo_disponibilidade: boolean,
		public bo_eviadoemail_disponibilidade: boolean,
		public bo_ativo: boolean,
		public vl_com_desconto: number,
		public id_user: number
	) {}
}
