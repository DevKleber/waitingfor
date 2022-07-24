const { By } = require("selenium-webdriver");
async function run(driver, url) {
  return await driver.get(url).then(async (_) => {
    let titulo = await driver.findElement(By.xpath(`//*[@id="productTitle"]`)).getText();
    let imagem = await driver.findElement(By.xpath(`//*[@id="landingImage"]`)).getAttribute("src");
    let valor = await driver.findElement(By.xpath(`//*[@id="corePrice_feature_div"]`)).getText();
    let vendidoPor = await driver.findElement(By.xpath(`//*[@id="tabular-buybox"]/div[1]/div[4]/div/span`)).getText() ?? "";
    const domain = url.split("/")[2];
    return { titulo, imagem, valor, domain, vendidoPor };
  });
}
module.exports = { run };
