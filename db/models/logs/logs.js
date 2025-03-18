module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"logs",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				comment: "Primary Key",
			},
			idUser: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "Medical Recipe ID",
			},
			idAction: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "Action ID",
			},
			tableName: {
				type: DataTypes.STRING(255),
				allowNull: false,
				comment: "Table Name",
			},
			idTable: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "Table ID",
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Description",
			},
		},
		{
			sequelize,
			tableName: "logs",
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
