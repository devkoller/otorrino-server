module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"family_history",
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
				allowNull: true,
				comment: "Patient ID",
			},
			family_history: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Family History",
			},
			other_medications: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Other Medications",
			},
		},
		{
			sequelize,
			tableName: "family_history",
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
