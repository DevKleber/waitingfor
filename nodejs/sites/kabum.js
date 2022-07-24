const { By } = require("selenium-webdriver");
async function run(driver, url) {
  return await driver.get(url).then(async (_) => {
    let imagem = await driver.findElement(By.xpath(`//*[@id="carouselDetails"]/div[2]/div/figure/img`)).getAttribute("src");
    let titulo = await driver.findElement(By.xpath(`//*[@id="__next"]/main/article/section/div[3]/div[1]/div/h1`)).getText();
    let valor = await driver.findElement(By.xpath(`//*[@id="blocoValores"]/div[2]/div/h4`)).getText();
    let vendidoPor = await driver.findElement(By.xpath(`//*[@id="blocoValores"]/div[1]/b[1]`)).getText() ?? "";
    let disponivel = await driver.findElement(By.xpath(`//*[@id="blocoValores"]/div[1]/b[2]`)).getText() ?? "";
    const domain = url.split("/")[2];
    return { titulo, imagem, valor, domain, vendidoPor, disponivel };
  });
}
module.exports = { run };
