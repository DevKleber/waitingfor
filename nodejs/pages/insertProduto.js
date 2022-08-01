const Create = require("../model/Produto/Create");

async function insertProduto(request, response) {
	try {
		const token = request.headers.authorization.split(" ")[1] ?? "";
		const item = await Create(request.body, token);
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
