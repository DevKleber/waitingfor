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
	shopee: require("../sites/shopee.js"),
	mercadolivre: require("../sites/mercadolivre.js"),
	americanas: require("../sites/americanas.js"),
	casasbahia: require("../sites/casasbahia.js"),
	submarino: require("../sites/submarino.js"),
	lenovo: require("../sites/lenovo.js"),
};


async function getProdutos(request, response) {
	const products = [];
	const optionsFirefox = new firefox.Options();
	optionsFirefox.setBinary("/opt/firefox/firefox");
	
	const driver = new Builder()
		.forBrowser("firefox")
		.setFirefoxOptions(
			optionsFirefox.headless()
        
		)
		.build();
	try {
		await database.sync();
		const produtos = await All();
		console.log(produtos);
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
		response.json({ return: "Erro ao obter produtos" });
		return err;
	} finally {
		console.error(err);
		console.log("fechando driver");
		await driver.quit();
	}
}

module.exports = { getProdutos };
