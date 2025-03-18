const Errors = require("./util/Errors")
const Success = require("./util/Success")
const Responses = require("./util/Responses")

const _medical_office = require("./medical_office/medical_office")
const _clinic_history = require("./patient/clinic_history")
const _family_history = require("./patient/family_history")
const _history = require("./patient/history")
const _pathological_history = require("./patient/pathological_history")
const _patient = require("./patient/patient")
const _patient_address = require("./patient/patient_address")
const _services = require("./service/service")
const _permissions = require("./user/permissions")
const _user_permissions = require("./user/user_permissions")
const _users = require("./user/user")
const _gender = require("./data/gender")
const _logs = require("./logs/logs")
const _medications = require("./medications/medications")
const _medical_recipe = require("./patient/medical_recipe")
const _medical_recipe_details = require("./patient/medical_recipe_details")
const _patient_assigned = require("./patient/patient_assigned")

module.exports = {
	Errors,
	Success,
	Responses,
	_users,
	_medical_office,
	_clinic_history,
	_family_history,
	_history,
	_pathological_history,
	_patient,
	_patient_address,
	_services,
	_permissions,
	_user_permissions,
	_gender,
	_logs,
	_medications,
	_medical_recipe,
	_medical_recipe_details,
	_patient_assigned,
}
