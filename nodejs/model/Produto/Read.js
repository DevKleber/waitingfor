const database = require("../../db");
const Produto = require("../../entity/produto");
const User = require("../../entity/user");

async function All() {
	try {
		await database.sync();
		const produtos = await Produto.findAll({
			where: {
				bo_ativo: true,
			},
			raw: true,
		});

		return produtos;
	} catch (error) {
		console.log(error);
	}

	//ou assim
}
async function byId(id) {
	try {
		const produto = await Produto.findByPk(id);
		return produto.toJSON();
	} catch (error) {
		console.log(error);
	}

	//ou assim
}

module.exports = { All, byId };
