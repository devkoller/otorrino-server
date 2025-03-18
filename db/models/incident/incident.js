module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"incident",
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
			idArea: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "Area ID",
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
			IdEncounter: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "Office ID",
			},
		},
		{
			sequelize,
			tableName: "incident",
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
