module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"patient_assigned",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				comment: "Primary Key",
			},
			patientId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "Patient ID",
			},
			idUser: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "User ID",
			},
		},
		{
			sequelize,
			tableName: "patient_assigned",
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
