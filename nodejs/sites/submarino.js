const { By } = require("selenium-webdriver");
const { sleep } = require("../utils/sleep");
async function run(driver, url) {
	
	
  return await driver.get(url).then(async (_) => {
	
	try {
		
		let vendidoPor = "";
		let disponivel = "";
		let imagem = await driver.findElement(By.xpath(`//*[@id="rsyswpsdk"]/div/main/div[2]/div[1]/div[1]/div[2]/div[1]/div/div/picture/img`)).getAttribute("src");
		let titulo = await driver.findElement(By.xpath(`//*[@id="rsyswpsdk"]/div/main/div[2]/div[1]/div[2]/h1`)).getText();
		let valor = 0;
		try {
			valor = await driver.findElement(By.xpath(`//*[@id="rsyswpsdk"]/div/main/div[2]/div[2]/div[1]/div[2]/div`)).getText();
		} catch (error) {console.log(error + "erro no primeiro  valor");}
		
		
		try {
			vendidoPor = await driver.findElement(By.xpath(`//*[@id="rsyswpsdk"]/div/main/div[2]/div[2]/div[4]/p/a`)).getText();
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
