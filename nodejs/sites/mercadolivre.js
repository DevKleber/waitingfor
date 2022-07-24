const { By } = require("selenium-webdriver");
const { sleep } = require("../utils/sleep");
async function run(driver, url) {
	
	
  return await driver.get(url).then(async (_) => {
	
	try {
		
		let imagem = await driver.findElement(By.xpath(`//*[@id="root-app"]/div/div[4]/div/div[2]/div[1]/div/div/div/div[2]/span[1]/figure/img`)).getAttribute("src");
		let titulo = await driver.findElement(By.xpath(`//*[@id="root-app"]/div/div[4]/div/div[1]/div/div[1]/div/div[1]/div/div[2]/h1`)).getText();
		let valor = 0;
		try {
			valor = await driver.findElement(By.xpath(`//*[@id="root-app"]/div/div[4]/div/div[1]/div/div[1]/div/div[2]/div/div[1]/span/span[3]`)).getText();
		} catch (error) {console.log(error + "erro no primeiro  valor");}
		
		
		let vendidoPor = "";
		let disponivel = "";
		const domain = url.split("/")[2];
		return { titulo, imagem, valor, domain, vendidoPor, disponivel };
	} catch (error) {
		console.log(error);
		return { titulo: "", imagem: "", valor: "", domain: "", vendidoPor: "", disponivel: "" };
	}
	
  });
}
module.exports = { run };
