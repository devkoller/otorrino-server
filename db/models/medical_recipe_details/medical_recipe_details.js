module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"medical_recipe_details",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				comment: "Primary Key",
			},
			id_medical_recipe: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "Medical Recipe ID",
			},
			id_medicine: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: "Medicine ID",
			},
			dosage: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Dosage",
			},
			frequency: {
				type: DataTypes.TEXT,
				allowNull: false,
				comment: "Frequency",
			},
			duration: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Duration",
			},
			special_instructions: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Special Instructions",
			},
			medicine_description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "medical_recipe_details",
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
