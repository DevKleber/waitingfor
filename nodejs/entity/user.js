const Sequelize = require("sequelize");
const database = require("../db");

const User = database.define("user", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	nome: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	usuario: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	created_at: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
	},
	updated_at: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	bo_ativo: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
	img: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = User;
