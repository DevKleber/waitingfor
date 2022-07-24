

const database = require("../../db");
const Produto = require("../../entity/produto");
const User = require("../../entity/user");

async function Update(id, params) {
	
	try {
		await database.sync();
		const produto = await Produto.findByPk(id);
		produto.update(params);

		return produto.toJSON();
	} catch (error) {
		console.log(error);
	}

	//ou assim
}

module.exports = Update;
