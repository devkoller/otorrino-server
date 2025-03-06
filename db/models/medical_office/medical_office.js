module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"medical_office",
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
			street: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Street",
			},
			neighborhood: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Neighborhood",
			},
			city: {
				type: DataTypes.STRING(50),
				allowNull: true,
				comment: "City",
			},
			state: {
				type: DataTypes.STRING(50),
				allowNull: true,
				comment: "State",
			},
			country: {
				type: DataTypes.STRING(50),
				allowNull: true,
				comment: "Country",
			},
			zip_code: {
				type: DataTypes.STRING(20),
				allowNull: true,
				comment: "Zip Code",
			},
			phone: {
				type: DataTypes.STRING(20),
				allowNull: true,
				comment: "Phone",
			},
			whatsapp: {
				type: DataTypes.STRING(20),
				allowNull: true,
				comment: "Whatsapp",
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Email",
			},
			website: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Website",
			},
			latitude: {
				type: DataTypes.DECIMAL(10, 8),
				allowNull: true,
				comment: "Latitude",
			},
			longitude: {
				type: DataTypes.DECIMAL(11, 8),
				allowNull: true,
				comment: "Longitude",
			},
			attention_days: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Attention Days",
			},
			payment_methods: {
				type: DataTypes.STRING(255),
				allowNull: true,
				comment: "Payment Methods",
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
				defaultValue: true,
			},
		},
		{
			sequelize,
			tableName: "medical_office",
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
