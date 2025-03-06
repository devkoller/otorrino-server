module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"permissions",
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
			route: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Route",
			},
			type: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: "Type",
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
			tableName: "permissions",
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
