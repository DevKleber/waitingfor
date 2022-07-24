const database = require("../../db");
const Produto = require("../../entity/produto");
const User = require("../../entity/user");

async function Create(params) {
	const { link } = params;
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
