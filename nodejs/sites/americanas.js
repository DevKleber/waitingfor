const { By } = require("selenium-webdriver");
async function run(driver, url) {
  return await driver.get(url).then(async (_) => {
	try {
		let imagem = await driver.findElement(By.xpath(`//*[@id="rsyswpsdk"]/div/main/div[2]/div[1]/div/div[1]/div[2]/div/div[1]/div/picture/img`)).getAttribute("src");
		let titulo = await driver.findElement(By.xpath(`//*[@id="rsyswpsdk"]/div/main/div[2]/div[1]/div/div[2]/h1`)).getText();
		let valor = 0;
		try {
			valor = await driver.findElement(By.xpath(`//*[@id="rsyswpsdk"]/div/main/div[2]/div[2]/div[1]/div[1]/div`)).getText();			
		} catch (error) {}
		if (valor.includes("%")) {
			valor = await driver.findElement(By.xpath(`//*[@id="rsyswpsdk"]/div/main/div[2]/div[2]/div[1]/div[2]/div`)).getText();
		}
		let vendidoPor =  "";
		try {
			vendidoPor = await driver.findElement(By.xpath(`//*[@id="rsyswpsdk"]/div/main/div[2]/div[2]/div[4]/p/strong`)).getText();			
		} catch (error) { }
		let disponivel = "";
		const domain = url.split("/")[2];
		return { titulo, imagem, valor, domain, vendidoPor, disponivel };
		
	} catch (error) {
		return error;
	}
  });
}
module.exports = { run };
