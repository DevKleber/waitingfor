const { By } = require("selenium-webdriver");
async function run(driver, url) {
  return await driver.get(url).then(async (_) => {
    let imagem = await driver.findElement(By.xpath(`//*[@id="poster"]`)).getAttribute("src");
    let titulo = await driver.findElement(By.xpath(`//*[@id="root"]/div/div[2]/div/div[2]/div[2]/h1`)).getText();
    let valor = await driver.findElement(By.xpath(`//*[@id="root"]/div/div[2]/div/div[2]/div[4]/div[2]/div[1]/span[1]`)).getText();
    let vendidoPor = "";
    let disponivel = "";
    const domain = url.split("/")[2];
    return { titulo, imagem, valor, domain, vendidoPor, disponivel };
  });
}
module.exports = { run };
