var DataTypes = require("sequelize").DataTypes
var _clinic_history = require("./clinic_history/clinic_history")
var _family_history = require("./family_history/family_history")
var _history = require("./history/history")
var _medical_office = require("./medical_office/medical_office")
var _pathological_history = require("./pathological_history/pathological_history")
var _patient = require("./patient/patient")
var _patient_address = require("./patient_address/patient_address")
var _permissions = require("./permissions/permissions")
var _services = require("./services/services")
var _user_permissions = require("./user_permissions/user_permissions")
var _users = require("./users/users")

function initModels(sequelize) {
	var clinic_history = _clinic_history(sequelize, DataTypes)
	var family_history = _family_history(sequelize, DataTypes)
	var history = _history(sequelize, DataTypes)
	var medical_office = _medical_office(sequelize, DataTypes)
	var pathological_history = _pathological_history(sequelize, DataTypes)
	var patient = _patient(sequelize, DataTypes)
	var patient_address = _patient_address(sequelize, DataTypes)
	var permissions = _permissions(sequelize, DataTypes)
	var services = _services(sequelize, DataTypes)
	var user_permissions = _user_permissions(sequelize, DataTypes)
	var users = _users(sequelize, DataTypes)

	patient.hasMany(clinic_history, {
		foreignKey: "idPatient",
	})

	patient.belongsTo(patient_address, {
		foreignKey: "id",
		targetKey: "idPatient",
	})

	patient.belongsTo(pathological_history, {
		foreignKey: "id",
		targetKey: "idPatient",
	})

	patient.belongsTo(family_history, {
		foreignKey: "id",
		targetKey: "idPatient",
	})

	patient.belongsTo(history, {
		foreignKey: "id",
		targetKey: "idPatient",
	})

	return {
		clinic_history,
		family_history,
		history,
		medical_office,
		pathological_history,
		patient,
		patient_address,
		permissions,
		services,
		user_permissions,
		users,
	}
}

module.exports = { initModels }
