const database = require("../../db");
const jwt = require("jsonwebtoken");
const Produto = require("../../entity/produto");
const User = require("../../entity/user");

async function All(token = null) {
	try {
		let userToken = { id: null };

		if (token) {
			userToken = jwt.decode(token);
		}

		await database.sync();
		const produtos = await Produto.findAll({
			where: {
				bo_ativo: true,
				id_user: userToken.id,
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
