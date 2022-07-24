const axios = require("axios");

async function produtos() {
  const options = {
    method: "GET",
    url: "https://api.notion.com/v1/blocks/41c8dad5c50442dcb8e04f9d9223ee30/children",
    headers: {
      "Notion-Version": "2021-05-13",
      "Content-Type": "application/json",
      Authorization: "Bearer secret_c2fJ5AqiNc9pDsE7bB9fK225ynKziTanIdJplejZJMt",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      const { results } = response.data;

      results.forEach((item) => {
        console.log(item.paragraph);
      });

      
    })
    .catch(function (error) {
      console.error(error);
    });
}
module.exports = { produtos };
