const { By } = require("selenium-webdriver");
const { sleep } = require("../utils/sleep");
async function run(driver, url) {
	
	
  return await driver.get(url).then(async (_) => {
	
	try {
		let imagem = "";
		try {
			imagem = await driver.findElement(By.xpath(`//*[@id="main"]/div/div[2]/div[1]/div/div[1]/div/div[2]/div[2]/div[1]/div[2]/div[2]/div/div[1]/div`)).getAttribute("style");
			imagem = String(imagem).match(/https.*"/gm) ?? ""; 
			imagem = String(imagem).replace("\\", "");
			imagem = String(imagem).replace('"', "");
		} catch (error) {}
		let titulo = await driver.findElement(By.xpath(`//*[@id="main"]/div/div[2]/div[1]/div/div[1]/div/div[2]/div[3]/div/div[1]/span`)).getText();
		let valor = 0;
		sleep(2000);
		try {
			valor = await driver.findElement(By.xpath(`//*[@id="main"]/div/div[2]/div[1]/div/div[1]/div/div[2]/div[3]/div/div[3]/div/div/div/div/div[2]`)).getText();			
		} catch (error) {console.log(error + "erro no primeiro  valor");}
		try {
			if (valor === 0) {
				valor = await driver.findElement(By.xpath(`//*[@id="main"]/div/div[2]/div[1]/div/div[1]/div/div[2]/div[3]/div/div[3]/div/div/div/div/div/div`)).getText();
			}
		} catch (error) {console.log(error + "erro no segundo  valor");}
		
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
