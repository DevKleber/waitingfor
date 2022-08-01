const jwt = require("jsonwebtoken");
const User = require("../entity/user");
// const bcrypt = require("bcryptjs");

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
		raw: true,
	});

	if (!user) {
		// não encontramos o e-mail em nossa base de dados
		return res.status(400).json({ error: "Usuário ou senha inválidos" });
	}

	// const validPass = await bcrypt.compare(password, user.password);
	// if (!validPass) {
	// 	return res.status(400).json({ error: "Usuário ou senha inválidos" });
	// }

	const token = jwt.sign({ id: user.id }, "myscsd12sfsecret");
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
