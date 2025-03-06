module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"history",
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
			tabaquism: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Tabaquism",
			},
			alcoholism: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Alcoholism",
			},
			drug_addiction: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Drug Addiction",
			},
			use_glasses: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Use Glasses",
			},
			use_hearing_aid: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Use Hearing Aid",
			},
			sleep_habits: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Sleep Habits",
			},
			sleep_habits_description: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Sleep Habits Description",
			},
			animals: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Drug Addiction",
			},
		},
		{
			sequelize,
			tableName: "history",
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
