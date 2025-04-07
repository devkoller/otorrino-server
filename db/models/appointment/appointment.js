const Sequelize = require("sequelize")
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"appointment",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				comment: "Primary Key",
			},
			patientId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "Patient ID",
			},
			idUser: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "User ID",
			},
			dateAppointment: {
				type: DataTypes.DATEONLY,
				allowNull: false,
				comment: "Appointment Date",
			},
			startTime: {
				type: DataTypes.STRING(10),
				allowNull: true,
				comment: "Start Time",
			},
			start: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: "Start Time",
			},
			duration: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: "Duration in minutes",
			},
			endTime: {
				type: DataTypes.STRING(10),
				allowNull: true,
				comment: "End Time",
			},
			end: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: "End Time",
			},
			status: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 1,
				comment: "Status",
			},
			reason: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Reason for Appointment",
			},
			notes: {
				type: DataTypes.TEXT,
				allowNull: true,
				comment: "Notes",
			},
			createdBy: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: "Created By",
			},
		},
		{
			sequelize,
			tableName: "appointment",
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
