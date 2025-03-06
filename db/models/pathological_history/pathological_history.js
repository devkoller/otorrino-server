module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"pathological_history",
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
			surgery: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Surgery",
			},
			surgery_description: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Surgery Description",
			},
			surgery_date: {
				type: DataTypes.DATEONLY,
				allowNull: true,
				comment: "Surgery Date",
			},
			allergies: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Allergies",
			},
			allergies_description: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Allergies Description",
			},
			asthma: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Asthma",
			},
			dm: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Diabetes Mellitus",
			},
			has: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Hypertension Arterial System",
			},
			other_diseases: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Other Diseases",
			},
			other_diseases_description: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Other Diseases Description",
			},
		},
		{
			sequelize,
			tableName: "pathological_history",
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
