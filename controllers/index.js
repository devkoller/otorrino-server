const user = require("./users/users_controller")
const services = require("./services/service_controller")
const patient = require("./patients/patients_controller")
const medical_office = require("./medical_office/medical_office_controller")
const medications = require("./medications/medications_controller")
const data = require("./data/data_controller")

module.exports = {
	user,
	services,
	patient,
	medical_office,
	medications,
	data,
}
