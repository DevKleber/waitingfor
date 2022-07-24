const database = require("../../db");
const Produto = require("../../entity/produto");
const User = require("../../entity/user");

async function Delete(id) {
	
	try {
		await database.sync();
		const produto = await Produto.findByPk(id);
		produto.destroy();
		return true;
	} catch (error) {
		console.log(error);
	}

	//ou assim
}

module.exports = Delete;
