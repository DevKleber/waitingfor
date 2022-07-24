const jwt = require("jsonwebtoken");
const User = require("../entity/user");

const login = async function (req, res) {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ error: "Dados incompletos" });
	}
	const user = await User.findOne({
		where: {
			email,
			password,
		},
	});
	if (!user) {
		return res.status(400).json({ error: "Usuário ou senha inválidos" });
	}
	const token = jwt.sign({ id: user.id }, "myscsd12sfsecret", {
		expiresIn: 60 * 60,
	});
	return res.json({
		token,
		me: {
			id: user.id,
			nome: user.nome,
			email: user.email,
			usuario: user.usuario,
			password: user.password,
			created_at: user.created_at,
			updated_at: user.updated_at,
			bo_ativo: user.bo_ativo,
		},
	});
};
module.exports = { login };
