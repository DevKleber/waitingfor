const Create = require("../model/Produto/Create");

async function insertProduto(request, response) {
	try {
		
		const item = await Create(request.body);
		response.json(item);
		// response.json(request.body);
	} catch (err) {
		console.error(err);
		response.status(400);
		response.json({ return: "Erro ao emitir dare" });
		return err;
	}
}

module.exports = { insertProduto };
