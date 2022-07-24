const Delete = require("../model/Produto/Delete");

async function deleteProduto(request, response) {
	const { id } = request.params;
	try {
		response.json(await Delete(id));
	} catch (err) {
		console.error(err);
		response.status(400);
		response.json({ return: "Erro ao emitir dare" });
		return err;
	}
}

module.exports = { deleteProduto };
