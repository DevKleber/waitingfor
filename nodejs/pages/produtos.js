const database = require("../db");

const firefox = require("selenium-webdriver/firefox");
const { Builder } = require("selenium-webdriver");
const { All } = require("../model/Produto/Read.js");
const Handler = {
	amazon: require("../sites/amazon.js"),
	centralar: require("../sites/centralar.js"),
	kabum: require("../sites/kabum.js"),
	magazineluiza: require("../sites/magazineluiza.js"),
	aliexpress: require("../sites/aliexpress.js"),
};


async function getProdutos(request, response) {
	const products = [];
	
	const driver = new Builder()
		.forBrowser("firefox")
		// .setFirefoxOptions(new firefox.Options().headless())
		.build();
	try {
		await database.sync();
		const produtos = await All();
		for (let i = 0; i < produtos.length; i++) {
			const produto = await Handler[produtos[i].dominio].run(
				driver,
				produtos[i].link
			);
			produto["id"] = produtos[i].id ?? null;
			produto["link"] = produtos[i].link ?? null;
			produto["dominio"] = produtos[i].dominio ?? null;
			produto["valorSalvo"] = produtos[i].vl_produto ?? null;
			products.push(produto);
		}
		response.json({ dados: products });
	} catch (err) {
		console.error(err);
		response.status(400);
		response.json({ return: "Erro ao emitir dare" });
		return err;
	} finally {
		console.log("fechando driver");
		await driver.quit();
	}
}

module.exports = { getProdutos };
