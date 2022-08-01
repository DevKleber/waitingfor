const { By } = require("selenium-webdriver");
const { sleep } = require("../utils/sleep");
async function run(driver, url) {
  return await driver.get(url).then(async (_) => {
	try {
		let valor = 0;
		let imagem = '';
		let titulo = '';
		await sleep(2000);

		try {
			imagem = await driver.findElement(By.xpath(`//*[@id="gallery"]/div[2]/div/div[1]/img`)).getAttribute("src");
		} catch (error) {}

		try {
			titulo = await driver.findElement(By.xpath(`/html/body/div[1]/div/div[3]/div[2]/div[2]/div[3]/div/div/div[2]/h1`)).getText();
		} catch (error) {console.log(error);}
		
		let vendidoPor =  "";
		try {
			vendidoPor = await driver.findElement(By.xpath(`//*[@id="sold-by"]/a/span`)).getText();			
		} catch (error) { }
		let disponivel = true;
		try {
			disponivel = await driver.findElement(By.xpath(`//*[@id="product-availability"]/div/div[1]/span/h2`)).getText();
			if (disponivel.includes("Avise-me")) {
				disponivel = false;
			}
		} catch (error) {}
		
		try {
			valor = await driver.findElement(By.xpath(`/html/body/div[1]/div/div[3]/div[2]/div[2]/div[5]/div[1]/div/p/span`)).getText();			
		} catch (error) { console.log(error); }
		
		const domain = url.split("/")[2];
		return { titulo, imagem, valor, domain, vendidoPor, disponivel };
		
	} catch (error) {
		return error;
	}
  });
}
module.exports = { run };
