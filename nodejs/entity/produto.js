const Sequelize = require("sequelize");
const database = require("../db");

const Produto = database.define("produto", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	link: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	dominio: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	vl_produto: {
		type: Sequelize.DECIMAL(10, 2),
		allowNull: false,
	},
	vl_informardesconto_apartir: {
		type: Sequelize.DECIMAL(10, 2),
		allowNull: false,
	},
	bo_email_desconto: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: 1,
	},
	bo_email_disponibilidade: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: 1,
	},
	bo_disponibilidade: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: 1,
	},
	bo_eviadoemail_disponibilidade: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: 1,
	},
	bo_ativo: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: 1,
	},
	vl_com_desconto: {
		type: Sequelize.DECIMAL(10, 2),
		allowNull: false,
		defaultValue: 0.0,
	},
	id_user: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	
});

module.exports = Produto;
