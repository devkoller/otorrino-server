module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"encounter",
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
			dateStart: {
				type: DataTypes.DATE,
				allowNull: false,
				comment: "Start Date",
			},
			dateEnd: {
				type: DataTypes.DATE,
				allowNull: false,
				comment: "End Date",
			},
			IdOffice: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "Office ID",
			},
		},
		{
			sequelize,
			tableName: "encounter",
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
