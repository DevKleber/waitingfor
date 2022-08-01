// const Produto = require("../entity/produto");
const database = require("../db");
const Create = require("../model/Produto/Create");
const Delete = require("../model/Produto/Delete");
const { byId, All } = require("../model/Produto/Read");
const Update = require("../model/Produto/Update");
const {nomeSite} = require("../Helpers/nomeSite");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU5MzA4ODg0fQ.Xy9muwaPvCvHfAY4vX77oypZd6DuqaOyQTMEoiMChr4';
let idProdutoSalvo = 0;

test("Deve retonar o nome do site pelo link, link simples", async () => {
	const link = "https://www.amazon.com.br/dp/B0872Y93TY/?coliid=I1JTUTYX4ZTE4C&colid=3DA65F6OPIJKI&psc=1&ref_=lv_ov_lig_dp_it";
	expect(nomeSite(link)).toBe("amazon");
});
test("Deve retonar o nome do site pelo link, link com .pt", async () => {
	const link = "https://pt.aliexpress.com/item/4000262656907.html?pdp_ext_f=%7B%22ship_from%22%3A%22CN%22%2C%22sku_id%22%3A%2212000024249380212%22%7D&scm=1007.25281.272534.0&scm_id=1007.25281.272534.0&scm-url=1007.25281.272534.0&pvid=30623ec6-d22f-4520-a08d-04c710961085&utparam=%257B%2522process_id%2522%253A%252256%2522%252C%2522x_object_type%2522%253A%2522product%2522%252C%2522pvid%2522%253A%252230623ec6-d22f-4520-a08d-04c710961085%2522%252C%2522belongs%2522%253A%255B%257B%2522floor_id%2522%253A%252230904758%2522%252C%2522id%2522%253A%252231580078%2522%252C%2522type%2522%253A%2522dataset%2522%257D%252C%257B%2522id_list%2522%253A%255B%25221000294769%2522%255D%252C%2522type%2522%253A%2522gbrain%2522%257D%255D%252C%2522pageSize%2522%253A%252220%2522%252C%2522language%2522%253A%2522pt%2522%252C%2522scm%2522%253A%25221007.25281.272534.0%2522%252C%2522countryId%2522%253A%2522BR%2522%252C%2522scene%2522%253A%2522TopSelection-Waterfall%2522%252C%2522tpp_buckets%2522%253A%252221669%25230%2523265320%25238_21669%25234190%252319167%2523943_15281%25230%2523272534%25230%2522%252C%2522x_object_id%2522%253A%25224000262656907%2522%257D&pdp_npi=2%40dis%21BRL%21R%24+2.347%2C44%21R%24+751%2C21%21%21%21%21%21%402101d91e16586267289236371eaf2a%2112000024249380212%21gdf&spm=a2g0o.plus.pick.item0&aecmd=true";
	expect(nomeSite(link)).toBe("aliexpress");
});

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
	}, token);

	const produto = await byId(item.id);
	expect(produto.bo_ativo).toBe(true);
	const itemDeletado = await Delete(item.id);

	expect(itemDeletado).toBe(true);
});

test("Deve criar um produto com o dominio certo", async () => {
	const item = await Create({
		link: "https://pt.aliexpress.com/item/4000262656907.html",
		vl_produto: "100.00",
		vl_informardesconto_apartir: "100.00",
		bo_email_desconto: true,
		bo_email_disponibilidade: true,
		bo_disponibilidade: true,
		bo_eviadoemail_disponibilidade: true,
		bo_ativo: true,
		vl_com_desconto: "0.00",
		id_user: 1,
	}, token);
	expect(item.dominio).toBe("aliexpress");
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
	}, token);
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
	}, token);

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
	const produtos = await All(token);
	expect(produtos.length).toBeGreaterThan(0);
});
