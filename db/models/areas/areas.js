module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"areas",
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
				allowNull: false,
				comment: "Name",
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Description",
			},
		},
		{
			sequelize,
			tableName: "areas",
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
