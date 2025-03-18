const CryptoJS = require("crypto-js")

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"users",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				comment: "Primary Key",
			},
			name: {
				type: DataTypes.STRING(50),
				allowNull: true,
				comment: "Service Name",
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Service Active",
				defaultValue: true,
			},
			public: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Service Public",
				defaultValue: false,
			},
			lastname1: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			lastname2: {
				type: DataTypes.STRING(50),
				allowNull: true,
				comment: "Service Name",
			},
			phone: {
				type: DataTypes.STRING(20),
				allowNull: true,
				comment: "Service Name",
			},
			birthdate: {
				type: DataTypes.DATEONLY,
				allowNull: true,
				comment: "Service Name",
				defaultValue: DataTypes.NOW,
			},
			academic: {
				type: DataTypes.STRING(50),
				allowNull: true,
				comment: "Service Name",
			},
			image: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Service Name",
			},
			password: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Service Name",
				defaultValue: "otorrino123",
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Service Name",
			},
		},
		{
			sequelize,
			tableName: "users",
			timestamps: true,
			paranoid: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id" }],
				},
			],
			hooks: {
				beforeCreate: async (user) => {
					if (!user.password) {
						return
					}
					const key = process.env.SECRET_KEY || "secret"
					const password = CryptoJS.AES.encrypt(user.password, key).toString()
					user.password = password
				},
				beforeUpdate: async (user) => {
					if (user.changed("password")) {
						const key = process.env.SECRET_KEY || "secret"
						const password = CryptoJS.AES.encrypt(user.password, key).toString()
						user.password = password
					} else {
						delete user.password
					}
				},
			},
		}
	)
}
