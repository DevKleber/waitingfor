const database = require("../../db");
const Produto = require("../../entity/produto");
const User = require("../../entity/user");
const { nomeSite } = require("../../Helpers/nomeSite");
const jwt = require("jsonwebtoken");

async function Create(params, token) {
	let userToken = { id: null };

	if (token) {
		userToken = jwt.decode(token);
	}

	const { link } = params;
	const site = nomeSite(link);
	params.id_user = userToken.id;
	params.dominio = site;

	if (!link) {
		return "O campo link é obrigatório";
	}
	if (!params.bo_ativo) {
		params.bo_ativo = true;
	}
	try {
		await database.sync();
		const produto = Produto.build(params);
		produtosave = await produto.save();
		return produtosave.toJSON();
	} catch (error) {
		console.log(error);
	}
}

module.exports = Create;
