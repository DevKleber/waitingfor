const { By } = require("selenium-webdriver");
async function run(driver, url) {
  return await driver.get(url).then(async (_) => {
	try {
		let titulo = await driver.findElement(By.xpath(`/html/body/main/div[6]/div[1]/div/div[3]/div/div/div[1]/div/div[1]`)).getText();
		let imagem = await driver
		  .findElement(By.xpath(`/html/body/main/div[6]/div[1]/div/div[1]/div[1]/div/div/div[1]/div/div[1]/div/div[1]/div/div/div/img`))
		  .getAttribute("src");
		let valor = await driver.findElement(By.xpath(`/html/body/main/div[6]/div[1]/div/div[3]/div/div/div[1]/span/div[2]/div[2]/div[1]/p`)).getText() ?? 0;
		// let vendidoPor = await driver.findElement(By.xpath(`//*[@id="tabular-buybox"]/div[1]/div[4]/div/span`)).getText() ?? "";
		const domain = url.split("/")[2];
		return { titulo, imagem, valor, domain, vendidoPor: "" };	
	} catch (error) {
		return { titulo: '', imagem: '', valor: '', domain: '', vendidoPor: "" };
	}
    
  });
}
module.exports = { run };
