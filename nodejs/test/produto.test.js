// const Produto = require("../entity/produto");
const database = require("../db");
const Create = require("../model/Produto/Create");
const Delete = require("../model/Produto/Delete");
const { byId, All } = require("../model/Produto/Read");
const Update = require("../model/Produto/Update");
let idProdutoSalvo = 0;

test("Deve criar um produto ativo caso bo_ativo esteja em branco", async () => {
	const item = await Create({
		link: "https://www.amazon.com.br/dp/B0872Y93TY/?coliid=I1JTUTYX4ZTE4C&colid=3DA65F6OPIJKI&psc=1&ref_=lv_ov_lig_dp_it",
		dominio: "amazon",
		vl_produto: "350.55",
		vl_informardesconto_apartir: "330",
		bo_email_desconto: true,
		bo_email_disponibilidade: "",
		bo_disponibilidade: "",
		bo_eviadoemail_disponibilidade: "",
		bo_ativo: "",
		vl_com_desconto: "",
		id_user: "",
	});

	const produto = await byId(item.id);
	expect(produto.bo_ativo).toBe(true);
	const itemDeletado = await Delete(item.id);

	expect(itemDeletado).toBe(true);
});

test("Deve criar um produto", async () => {
	const item = await Create({
		link: "https://www.centralar.com.br/p/ar-condicionado-split-hw-dual-inverter-voice-lg-12000-btus-frio-220v-monofasico-s4nq12ja31ceb2gamz",
		dominio: "centralar",
		vl_produto: "100.00",
		vl_informardesconto_apartir: "100.00",
		bo_email_desconto: true,
		bo_email_disponibilidade: true,
		bo_disponibilidade: true,
		bo_eviadoemail_disponibilidade: true,
		bo_ativo: true,
		vl_com_desconto: "0.00",
		id_user: 1,
	});
	idProdutoSalvo = item.id;
	expect(item.id).toBeGreaterThan(0);
});

test("Deve tentar criar um produto sem a url", async () => {
	const item = await Create({
		dominio: "google.com",
		vl_produto: "100.00",
		vl_informardesconto_apartir: "100.00",
		bo_email_desconto: true,
		bo_email_disponibilidade: true,
		bo_disponibilidade: true,
		bo_eviadoemail_disponibilidade: true,
		bo_ativo: true,
		vl_com_desconto: "0.00",
		id_user: 1,
	});

	expect(item).toBe("O campo link é obrigatório");
});

test("Deve alterar um produto", async () => {
	await Update(idProdutoSalvo, {
		link: "https://www.google.com",
		dominio: "alterado2.com",
		vl_produto: "100.00",
		vl_informardesconto_apartir: "100.00",
		bo_email_desconto: true,
		bo_email_disponibilidade: true,
		bo_disponibilidade: true,
		bo_eviadoemail_disponibilidade: true,
		bo_ativo: true,
		vl_com_desconto: "0.00",
		id_user: 1,
	});

	const produto = await byId(idProdutoSalvo);
	expect(produto.dominio).toBe("alterado2.com");
});

test("Deve deletar um produto", async () => {
	const item = await Delete(idProdutoSalvo);

	expect(item).toBe(true);
});

test("Deve listar todos os produtos", async () => {
	const produtos = await All();
	console.log(produtos);
	expect(produtos.length).toBeGreaterThan(0);
});
