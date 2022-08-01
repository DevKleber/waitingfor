
const nomeSite = (url) => {
	if (!url) {
		return;
	}
	try {
		const sites = [
			'amazon',
			'centralar',
			'kabum',
			'magazineluiza',
			'aliexpress',
			'shopee',
			'mercadolivre',
			'americanas',
			'casasbahia',
			'submarino',
			'lenovo',
		];

		// procurar o site na url
		for (let i = 0; i < sites.length; i++) {
			if (url.includes(sites[i])) {
				return sites[i];
			}
		}
		
		return url.split("/")[2]
			.replace(".com", "")
			.replace(".br", "")
			.replace("www.", "")
			.replace("www", "")
			.replace(".pt", "")
			.replace("pt.", "")
		;

	} catch (error) {
		console.log(error);
	}
};
module.exports =  { nomeSite };
