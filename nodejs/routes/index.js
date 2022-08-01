const { Router } = require("express");

const authMiddle = require("../Helpers/auth");

const { deleteProduto } = require("../pages/deleteProduto");
const { insertProduto } = require("../pages/insertProduto");
const { getProdutos } = require("../pages/produtos");
const { login } = require("../pages/login");

const routes = Router();

routes.get("/", function (req, res) {
	res.json("API is Online ok!");
});

routes.get("/produto", authMiddle, getProdutos);
routes.post("/produto", insertProduto);
routes.delete("/produto/:id", deleteProduto);
routes.post("/auth/login", login);

module.exports = { routes };
