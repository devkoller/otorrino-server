module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"services",
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
				comment: "Service Name",
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Service Description",
			},
			suffering: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Suffering Description",
			},
			icon: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Service Icon",
			},
			type: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: "Service Type",
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Service Active",
				defaultValue: true,
			},
			public: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Service Public",
			},
		},
		{
			sequelize,
			tableName: "services",
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
