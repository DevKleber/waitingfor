const { By } = require("selenium-webdriver");
const { sleep } = require("../utils/sleep");
async function run(driver, url) {
	
	
  return await driver.get(url).then(async (_) => {
	
	try {
		await sleep(3000);
		let vendidoPor = "";
		let disponivel = "";
		let imagem = await driver.findElement(By.xpath(`//*[@id="longscroll-subseries"]/div[1]/div[2]/div[2]/div[1]/div/div/div[2]/img`)).getAttribute("src");
		let titulo = await driver.findElement(By.xpath(`//*[@id="tab-li-models"]/h2`)).getText();
		let valor = 0;
		try {
			valor = await driver.findElement(By.xpath(`//*[@id="builderPricingSummary"]/dd[2]`)).getText();
		} catch (error) {console.log(error + "erro no primeiro  valor");}
		
		
		try {
			vendidoPor = "Lenovo";
		} catch (error) {}

		const domain = url.split("/")[2];
		return { titulo, imagem, valor, domain, vendidoPor, disponivel };
	} catch (error) {
		console.log(error);
		return { titulo: "", imagem: "", valor: "", domain: "", vendidoPor: "", disponivel: "" };
	}
	
  });
}
module.exports = { run };
