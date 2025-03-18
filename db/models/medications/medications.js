module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"medications",
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
				comment: "Name",
			},
			brand: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Brand",
			},
			presentation: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Presentation",
			},
		},
		{
			sequelize,
			tableName: "medications",
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
