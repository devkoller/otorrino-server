module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"user_permissions",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				comment: "Primary Key",
			},
			id_user: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "User ID",
			},
			id_permission: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "Permission ID",
			},
		},
		{
			sequelize,
			tableName: "user_permissions",
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
