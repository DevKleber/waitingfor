const { By } = require("selenium-webdriver");
const { sleep } = require("../utils/sleep");
async function run(driver, url) {
  return await driver.get(url).then(async (_) => {
	try {
		await sleep(2000);
		let titulo = await driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div/div/div[1]/div/div/div/div[1]/section/section/section[1]/h4`)).getText();
		let imagem = await driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div/div/div[1]/div/div/div/div[1]/section/div[2]/div[1]/div[1]/img[1]`)).getAttribute("src");
		let valor = await driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div/div/div[1]/div/div/div/div[1]/section/section/section[3]/div[1]/p[2]/strong/span`)).getText();
		let vendidoPor = "Brastemp";
		const domain = url.split("/")[2];
		return { titulo, imagem, valor, domain, vendidoPor };
	} catch (error) {
		return { titulo: '', imagem: '', valor: '', domain: '', vendidoPor: "" };
	}
  });
}
module.exports = { run };
