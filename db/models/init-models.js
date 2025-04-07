var DataTypes = require("sequelize").DataTypes
var _actions = require("./actions/actions")
var _appointment = require("./appointment/appointment")
var _areas = require("./areas/areas")
var _clinic_history = require("./clinic_history/clinic_history")
var _encounter = require("./encounter/encounter")
var _family_history = require("./family_history/family_history")
var _gender = require("./gender/gender")
var _history = require("./history/history")
var _incident = require("./incident/incident")
var _logs = require("./logs/logs")
var _medical_office = require("./medical_office/medical_office")
var _medical_recipe = require("./medical_recipe/medical_recipe")
var _medical_recipe_details = require("./medical_recipe_details/medical_recipe_details")
var _medications = require("./medications/medications")
var _pathological_history = require("./pathological_history/pathological_history")
var _patient = require("./patient/patient")
var _patient_address = require("./patient_address/patient_address")
var _patient_assigned = require("./patient_assigned/patient_assigned")
var _permissions = require("./permissions/permissions")
var _services = require("./services/services")
var _user_permissions = require("./user_permissions/user_permissions")
var _users = require("./users/users")

function initModels(sequelize) {
	var actions = _actions(sequelize, DataTypes)
	var appointment = _appointment(sequelize, DataTypes)
	var areas = _areas(sequelize, DataTypes)
	var clinic_history = _clinic_history(sequelize, DataTypes)
	var encounter = _encounter(sequelize, DataTypes)
	var family_history = _family_history(sequelize, DataTypes)
	var gender = _gender(sequelize, DataTypes)
	var history = _history(sequelize, DataTypes)
	var incident = _incident(sequelize, DataTypes)
	var logs = _logs(sequelize, DataTypes)
	var medical_office = _medical_office(sequelize, DataTypes)
	var medical_recipe = _medical_recipe(sequelize, DataTypes)
	var medical_recipe_details = _medical_recipe_details(sequelize, DataTypes)
	var medications = _medications(sequelize, DataTypes)
	var pathological_history = _pathological_history(sequelize, DataTypes)
	var patient = _patient(sequelize, DataTypes)
	var patient_address = _patient_address(sequelize, DataTypes)
	var patient_assigned = _patient_assigned(sequelize, DataTypes)
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

	clinic_history.belongsTo(users, {
		foreignKey: "idUser",
		targetKey: "id",
	})

	clinic_history.belongsTo(medical_recipe, {
		foreignKey: "id",
		targetKey: "idClinic",
	})

	medical_recipe.belongsTo(patient, {
		foreignKey: "idPatient",
		targetKey: "id",
	})

	medical_recipe.hasMany(medical_recipe_details, {
		sourceKey: "id",
		foreignKey: "id_medical_recipe",
	})

	medical_recipe_details.belongsTo(medications, {
		foreignKey: "id_medicine",
		targetKey: "id",
	})

	appointment.belongsTo(patient, {
		foreignKey: "patientId",
		targetKey: "id",
	})

	appointment.belongsTo(users, {
		foreignKey: "idUser",
		targetKey: "id",
	})

	patient.hasMany(appointment, {
		foreignKey: "patientId",
	})

	return {
		actions,
		appointment,
		areas,
		clinic_history,
		encounter,
		family_history,
		gender,
		history,
		incident,
		logs,
		medical_office,
		medical_recipe,
		medical_recipe_details,
		medications,
		pathological_history,
		patient,
		patient_address,
		patient_assigned,
		permissions,
		services,
		user_permissions,
		users,
	}
}

module.exports = { initModels }
