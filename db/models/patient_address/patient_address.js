module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"patient_address",
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
			street: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Patient Street",
			},
			number: {
				type: DataTypes.STRING(20),
				allowNull: true,
				comment: "Patient Number",
			},
			neighborhood: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Patient Neighborhood",
			},
			city: {
				type: DataTypes.STRING(50),
				allowNull: true,
				comment: "Patient City",
			},
			state: {
				type: DataTypes.STRING(50),
				allowNull: true,
				comment: "Patient State",
			},
			country: {
				type: DataTypes.STRING(50),
				allowNull: true,
				comment: "Patient Country",
			},
			zip_code: {
				type: DataTypes.STRING(20),
				allowNull: true,
				comment: "Patient Zip Code",
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
			tableName: "patient_address",
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
