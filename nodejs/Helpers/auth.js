const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (!token) {
			return res.status(401).json({ error: "Token não encontrado" });
		}
		const tokenSplit = token.split(" ");
		
		if (
			tokenSplit[0] == "Bearer" &&
			jwt.verify(tokenSplit[1], "myscsd12sfsecret")
		) {
			return next();
		}

		if (!token) {
			return res.status(401).json({ error: "Token não encontrado" });
		}
		jwt.verify(token, "myscsd12sfsecret", (err, decoded) => {
			if (err) {
				return res.status(401).json({ error: "Token inválido" });
			}
			req.userId = decoded.id;
			next();
		});
	} catch (error) {
		return res.status(401).json({ error: error });
	}
};
module.exports =  auth ;
