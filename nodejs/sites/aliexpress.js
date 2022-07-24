const { By } = require("selenium-webdriver");
const { sleep } = require("../utils/sleep");
async function run(driver, url) {
  return await driver.get(url).then(async (_) => {
	
	try {
		try {
			console.log("alterando cookies");
			await driver.manage().addCookie({name:'XSRF-TOKEN', value:'775fca5a-de2c-4532-8fc5-a3e62dde16e8', domain:'pt.aliexpress.com'});
			await driver.manage().addCookie({name:'isg', value: 'BEBAOxoHNt4QIcpwvgteYzU8EccSySST26HnJLrRDNvuNeBfYtn0IxaHTYX1hdxr', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'l', value: 'eBIetlzVLw05kCeDBOfwourza77OSIRAguPzaNbMiOCP_4165TPOB6vCSqTBC3MNh6VMR3rYvZdJBeYBYSXo9kP5XNxHZQDmn', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'tfstk', value: 'cVAlBd9EPR4IW28w8Q1StwzfFzmOZVNFjBJwg4suoNbeJFdViky4Q30xowns4J1..'	, domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'JSESSIONID', value: 'D7D07F44AED1309AE683E780ABF381AD', domain:'pt.aliexpress.com'});
			await driver.manage().addCookie({name:'RT', value: '"z=1&dm=aliexpress.com&si=cdf2581b-d3dc-444e-8c3b-234043f3028d&ss=l5zezgkl&sl=f&tt=e9x&obo=9&rl=1"', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'xman_us_f', value: 'x_locale=pt_BR&x_l=0&x_c_chg=0&acs_rt=80d2a00bc6704c16bc67974480910350', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'ali_apache_tracktmp', value:'', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'_ga', value:'fb.1.1658676906167.636128357', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'xman_t', value:'eShWRsJMw/+IGGQSe6fWfo4dOsWl1goiD5OloZnAbEsfq0vqiZYhBq6JN2R7m2N1', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'e_id', value:'pt100', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'intl_common_forever', value:'OzzeWqOpy05TYStTlGFeT5NTlYjclbXb0gil9VOAZVYLNKW0BQ71uw==', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'xman_f', value:'6H4qLE/K7d78KeaM6PdBNlR0dbWVV91Rzw9FrNE/xZVXDEFwlCTJ2qehYcXbW1eyUUTv3Iar1j/Y5AD6C4zt0nv9U476t6Zgg89jpL7iht8FVSLwcrdTgA==', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'xlly_s', value:'1', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'_gat', value:'1', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'ali_apache_track', value:'', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'_fbp', value:'fb.1.1658676906167.636128357', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'_m_h5_tk_enc', value:'77fff73d514bfc5a38322991959e4bb0', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'_m_h5_tk', value:'46e7b4023a138571249b9f3483d08c1d_1658678975313', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'_gid', value:'GA1.2.1715978316.1658676906', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'ali_apache_id', value:'33.3.24.209.165867690492.198654.1', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'intl_locale', value:'pt_BR', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'aep_usuc_f', value:'site=bra&province=903200010000000000&city=903200010028000000&c_tp=BRL&region=BR&b_locale=pt_BR', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'AKA_A2', value:'A', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'_gcl_au', value:'1.1.1207847754.1658676906', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'aep_history', value:'keywords%5E%0Akeywords%09%0A%0Aproduct_selloffer%5E%0Aproduct_selloffer%094000262656907', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'cna', value:'ysL+GjikLlECAYMADvytfd4b', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'acs_usuc_t', value:'x_csrf=12z0ytxwfx6o8&acs_rt=80d2a00bc6704c16bc67974480910350', domain: '.aliexpress.com'});
			await driver.manage().addCookie({name:'_ga_VED1YSGNC7', value:'GS1.1.1658676005.1.1.1658676924.0', domain: '.aliexpress.com'});
			
			await driver.get(url);

		} catch (error) {
			console.log(error);
		}
		
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
