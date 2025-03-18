module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"clinic_history",
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
			oral: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Oral",
			},
			oral_description: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Oral Description",
			},
			nose: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Nose",
			},
			nose_description: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Nose Description",
			},
			earing_left: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Earings",
			},
			earing_left_description: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Earings Description",
			},
			earing_right: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Earings",
			},
			earing_right_description: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Earings Description",
			},
			face: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				comment: "Face",
			},
			face_description: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Face Description",
			},
			evolution: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			idx: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			plan: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			mc: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			idUser: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: "User ID",
			},
		},
		{
			sequelize,
			tableName: "clinic_history",
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
