const { By } = require("selenium-webdriver");
const { sleep } = require("../utils/sleep");
async function run(driver, url) {
  return await driver.get(url).then(async (_) => {
	
	try {
		await driver.manage().addCookie({name:'RT', value: '"z=1&dm=aliexpress.com&si=cdf2581b-d3dc-444e-8c3b-234043f3028d&ss=l5zezgkl&sl=f&tt=e9x&obo=9&rl=1"', domain: '.aliexpress.com'});
		await driver.manage().addCookie({name:'xman_us_f', value: 'x_locale=pt_BR&x_l=0&x_c_chg=0&acs_rt=80d2a00bc6704c16bc67974480910350', domain: '.aliexpress.com'});
		await driver.manage().addCookie({name:'e_id', value:'pt100', domain: '.aliexpress.com'});
		await driver.manage().addCookie({name:'intl_locale', value:'pt_BR', domain: '.aliexpress.com'});
		await driver.manage().addCookie({name:'aep_usuc_f', value:'site=bra&province=903200010000000000&city=903200010028000000&c_tp=BRL&region=BR&b_locale=pt_BR', domain: '.aliexpress.com'});
		await driver.get(url);
	} catch (error) {
		console.log(error);
	}
	
	try {
		
		let imagem = await driver.findElement(By.xpath(`//*[@id="poster"]`)).getAttribute("src");
		let titulo = await driver.findElement(By.xpath(`//*[@id="root"]/div/div[2]/div/div[2]/div[2]/h1`)).getText();
		let valor = await driver.findElement(By.xpath(`//*[@id="root"]/div/div[2]/div/div[2]/div[4]/div[2]/div[1]/span[1]`)).getText();
		
		let vendidoPor = "";
		let disponivel = "";
		const domain = url.split("/")[2];
		return { titulo, imagem, valor, domain, vendidoPor, disponivel };
	} catch (error) {
		return { titulo: "", imagem: "", valor: "", domain: "", vendidoPor: "", disponivel: "" };
	}
	
  });
}
module.exports = { run };
