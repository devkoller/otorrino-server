module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"patient",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				comment: "Primary Key",
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Patient Name",
			},
			lastname1: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Patient Lastname",
			},
			lastname2: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Patient second Lastname",
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Patient Email",
			},
			phone: {
				type: DataTypes.STRING(20),
				allowNull: true,
				comment: "Patient Phone",
			},
			birthdate: {
				type: DataTypes.DATEONLY,
				allowNull: true,
				comment: "Patient Birthdate",
			},
			mc: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Patient Medical Center",
			},
			workIn: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Patient Work In",
			},
			curp: {
				type: DataTypes.STRING(20),
				allowNull: true,
				comment: "Patient CURP",
			},
			rfc: {
				type: DataTypes.STRING(20),
				allowNull: true,
				comment: "Patient RFC",
			},
			gender: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: "Patient gender",
			},
			bloodType: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: "Patient Blood Type",
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Active",
				defaultValue: true,
			},
		},
		{
			sequelize,
			tableName: "patient",
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
		}
	)
}
