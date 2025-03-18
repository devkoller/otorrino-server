module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"gender",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				comment: "Primary Key",
			},
			name: {
				type: DataTypes.STRING(20),
				allowNull: false,
				comment: "Name",
			},
		},
		{
			sequelize,
			tableName: "gender",
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
