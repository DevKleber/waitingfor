const { By } = require("selenium-webdriver");
async function run(driver, url) {
  return await driver.get(url).then(async (_) => {
	try {
		let imagem = await driver.findElement(By.xpath(`//*[@id="__next"]/div/main/section[3]/div/div/div/div[2]/img`)).getAttribute("src");
		let titulo = await driver.findElement(By.xpath(`//*[@id="__next"]/div/main/section[2]/div[2]/h1`)).getText();
		let valor = await driver.findElement(By.xpath(`//*[@id="__next"]/div/main/section[4]/div[4]/div/div/div/p[2]`)).getText();
		let vendidoPor =  "";
		let disponivel = "";
		const domain = url.split("/")[2];
		return { titulo, imagem, valor, domain, vendidoPor, disponivel };
		
	} catch (error) {
		return error;
	}
  });
}
module.exports = { run };
