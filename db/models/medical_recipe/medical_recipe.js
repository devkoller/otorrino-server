module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"medical_recipe",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				comment: "Primary Key",
			},
			idPatient: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "Patient ID",
			},
			idUser: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "Doctor ID",
			},
			idClinic: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: "medical_recipe",
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
