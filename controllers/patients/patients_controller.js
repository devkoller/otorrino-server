const {
	Success,
	_patient,
	_patient_address,
	_clinic_history,
	_pathological_history,
	_family_history,
	_history,
	_medical_recipe,
	_medical_recipe_details,
	_appointment,
} = require("../../models")
const fs = require("fs")
const path = require("path")
const { functions } = require("../../util")
const { format } = require("date-fns")
const client = require("@jsreport/nodejs-client")(
	process.env.JSREPORT_URL,
	process.env.JSREPORT_USER,
	process.env.JSREPORT_PASSWORD
)

class patientsController {
	constructor() {
		this.createPatient = this.createPatient.bind(this)
		this.updatePatient = this.updatePatient.bind(this)
		this.getAllPatients = this.getAllPatients.bind(this)

		// create histories
		this.createClinicHistory = this.createClinicHistory.bind(this)
		this.createPathologicalHistory = this.createPathologicalHistory.bind(this)
		this.createFamilyHistory = this.createFamilyHistory.bind(this)
		this.createHistory = this.createHistory.bind(this)
		this.createAddress = this.createAddress.bind(this)
		this.helpers = this.helpers.bind(this)
		this.makePDFHistory = this.makePDFHistory.bind(this)

		// update histories
		this.updateClinicHistory = this.updateClinicHistory.bind(this)
		this.updatePathologicalHistory = this.updatePathologicalHistory.bind(this)
		this.updateFamilyHistory = this.updateFamilyHistory.bind(this)
		this.updateHistory = this.updateHistory.bind(this)
		this.updateAddress = this.updateAddress.bind(this)

		//appointment
		this.createAppointment = this.createAppointment.bind(this)
		this.updateAppointment = this.updateAppointment.bind(this)
		this.getAllAppointments = this.getAllAppointments.bind(this)
	}

	async createPatient(req) {
		let body = req.body
		try {
			const patientModel = new _patient()
			let patient = await patientModel.create(body)

			return new Success({
				name: "CreatePatientSuccess",
				message: "Paciente creado exitosamente",
				status: 200,
				data: patient,
			})
		} catch (error) {
			throw {
				name: "CreatePatientError",
				message: "",
				error,
			}
		}
	}

	async updatePatient(req) {
		let body = req.body
		try {
			const patientModel = new _patient()
			await patientModel.update(body, body.id)

			return new Success({
				name: "ModifyPatientSuccess",
				message: "Paciente modificado exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "ModifyPatientError",
				message: "",
				error,
			}
		}
	}

	async getAllPatients() {
		try {
			const patientModel = new _patient()
			let patients = await patientModel.findAll()

			return new Success({
				name: "GetAllPatientsSuccess",
				message: "Pacientes obtenidos exitosamente",
				status: 200,
				data: patients,
			})
		} catch (error) {
			throw {
				name: "GetAllPatientsError",
				message: "",
				error,
			}
		}
	}

	async getPatient(req) {
		const { id } = req.params
		try {
			const patientModel = new _patient()
			let patients = await patientModel.findById(id)

			const appointmentModel = new _appointment()
			let appointments = await appointmentModel.findAllByPatient(id)

			return new Success({
				name: "GetAllPatientsSuccess",
				message: "Pacientes obtenidos exitosamente",
				status: 200,
				data: {
					...patients,
					appointments,
				},
			})
		} catch (error) {
			throw {
				name: "GetAllPatientsError",
				message: "",
				error,
			}
		}
	}

	helpers() {
		return `
      const jsreport = require('jsreport-proxy')
      const qri = await jsreport.npm.require('qr-image@3.2.0')
  
      async function barcode(text) {
          const png = qri.imageSync(text, { type: 'png' }).toString('base64')
          return 'data:image/png;base64,' + png;
      }
      
      async function qrs(text) {
          const png = text.split('|')
          return png[1]
      }
  
  
      function getPageNumber (pageIndex) {
          if (pageIndex == null) {
              return ''
          }
          const pageNumber = pageIndex + 1
          return pageNumber
      }
  
      function getTotalPages (pages) {
          if (!pages) {
              return ''
          }
          return pages.length
      }

      function formatBoolean (value) {
        return value ? 'Sí' : 'No'
      }
                
    `
	}

	async makePDFHistory(req, response) {
		const { id_clinic, tam } = req.body
		try {
			const size = {
				1: {
					width: "21.59cm",
					height: "13.97cm",
					marginTop: "3cm",
					marginBottom: "2cm",
					marginLeft: "3.5cm",
					marginRight: "1.5cm",
				},
				2: {
					width: "21.59cm",
					height: "27.94cm",
					marginTop: "3cm",
					marginBottom: "2cm",
					marginLeft: "3.5cm",
					marginRight: "1.5cm",
				},
			}
			const medicalRecipeModel = new _medical_recipe()
			const medicalRecipe = await medicalRecipeModel.findByClinic(id_clinic)

			let patient = medicalRecipe.patient
			let name = `${patient.name} ${patient.lastname1} ${patient.lastname2}`
			let date = format(medicalRecipe.createdAt, "MMMM d, yyyy")
			const main = fs.readFileSync(
				path.join(__dirname, "../../reports/clinic-history.html"),
				"utf8"
			)

			const resp = await client
				.render({
					template: {
						content: main,
						engine: "handlebars",
						recipe: "chrome-pdf",
						helpers: this.helpers(),
						chrome: {
							...size[tam],
						},
						pdfMeta: {
							title: "Receta media" + name + " " + date,
						},
					},
					data: {
						name,
						date,
						...medicalRecipe,
					},
				})
				.then(async (resp) => resp)
				.catch((error) => {
					console.log(error)
					return response.status(500).send({
						status: 500,
						message: "Error al generar el reporte",
					})
				})

			// resp.pipe(response)
			let buffer = await resp.body()
			let base64 = buffer.toString("base64")

			return new Success({
				name: "GetAllPatientsSuccess",
				message: "Pacientes obtenidos exitosamente",
				status: 200,
				data: base64,
			})
		} catch (error) {
			console.log(
				"🚀 > patients_controller.js:215 > patientsController > makePDFHistory > error:",
				error
			)
			throw {
				name: "CreateClinicHistoryError",
				message: "",
				error,
			}
		}
	}

	// create histories
	async createClinicHistory({ body }) {
		const { auth } = body
		try {
			const { idPatient, medications, appointment } = body
			const clinicHistoryModel = new _clinic_history()
			const clinic = await clinicHistoryModel.create({
				...body,
				idUser: auth.user.id,
			})

			const recipeModel = new _medical_recipe()
			const recipe = await recipeModel.create({
				idUser: auth.user.id,
				idPatient,
				idClinic: clinic.id,
			})
			const recipeDetailModel = new _medical_recipe_details()

			for (let element of medications) {
				await recipeDetailModel.create({
					...element,
					id_medical_recipe: recipe.id,
				})
			}

			if (appointment) {
				const appointmentModel = new _appointment()
				await appointmentModel.update({ status: 2 }, appointment.id)
			}

			return new Success({
				name: "CreateClinicHistorySuccess",
				message: "Historia clínica creada exitosamente",
				status: 200,
				data: clinic,
			})
		} catch (error) {
			throw {
				name: "CreateClinicHistoryError",
				message: "",
				error,
			}
		}
	}

	async createPathologicalHistory(req) {
		try {
			const pathologicalModel = new _pathological_history()
			await pathologicalModel.create(req.body)

			return new Success({
				name: "CreatePathologicalHistorySuccess",
				message: "Historia patológica creada exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "CreatePathologicalHistoryError",
				message: "",
				error,
			}
		}
	}

	async createFamilyHistory(req) {
		try {
			const familyModel = new _family_history()
			await familyModel.create(req.body)

			return new Success({
				name: "CreateFamilyHistorySuccess",
				message: "Historia familiar creada exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "CreateFamilyHistoryError",
				message: "",
				error,
			}
		}
	}

	async createHistory(req) {
		try {
			const historyModel = new _history()
			await historyModel.create(req.body)

			return new Success({
				name: "CreateHistorySuccess",
				message: "Historia creada exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "CreateHistoryError",
				message: "",
				error,
			}
		}
	}

	async createAddress(req) {
		try {
			const addressModel = new _patient_address()
			await addressModel.create(req.body)

			return new Success({
				name: "CreateHistorySuccess",
				message: "Historia creada exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "CreateHistoryError",
				message: "",
				error,
			}
		}
	}

	// update histories
	async updateClinicHistory(req) {
		try {
			const clinicHistoryModel = new _clinic_history()
			await clinicHistoryModel.update(req.body, req.body.id)

			return new Success({
				name: "UpdateClinicHistorySuccess",
				message: "Historia clínica actualizada exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "UpdateClinicHistoryError",
				message: "",
				error,
			}
		}
	}

	async updatePathologicalHistory(req) {
		try {
			const pathologicalModel = new _pathological_history()
			await pathologicalModel.update(req.body, req.body.id)

			return new Success({
				name: "UpdatePathologicalHistorySuccess",
				message: "Historia patológica actualizada exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "UpdatePathologicalHistoryError",
				message: "",
				error,
			}
		}
	}

	async updateFamilyHistory(req) {
		try {
			const familyModel = new _family_history()
			await familyModel.update(req.body, req.body.id)

			return new Success({
				name: "UpdateFamilyHistorySuccess",
				message: "Historia familiar actualizada exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "UpdateFamilyHistoryError",
				message: "",
				error,
			}
		}
	}

	async updateHistory(req) {
		try {
			const historyModel = new _history()
			await historyModel.update(req.body, req.body.id)

			return new Success({
				name: "UpdateHistorySuccess",
				message: "Historia actualizada exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "UpdateHistoryError",
				message: "",
				error,
			}
		}
	}

	async updateAddress(req) {
		try {
			const addressModel = new _patient_address()
			await addressModel.update(req.body)

			return new Success({
				name: "UpdateHistorySuccess",
				message: "Historia actualizada exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "UpdateHistoryError",
				message: "",
				error,
			}
		}
	}

	async createAppointment(req) {
		let body = req.body
		try {
			const appointmentModel = new _appointment()

			let { auth } = req.body

			let start = functions.toMinutes(body.startTime)
			let end = start + body.duration
			let endTime = functions.toString(end)
			let createdBy = auth.user.id

			let saveBody = {
				...req.body,
				start,
				end,
				endTime,
				createdBy,
			}

			await appointmentModel.create(saveBody)

			return new Success({
				name: "CreateAppointmentSuccess",
				message: "Cita creada exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "CreateAppointmentError",
				message: "",
				error,
			}
		}
	}

	async updateAppointment(req) {
		let body = req.body

		try {
			const appointmentModel = new _appointment()
			await appointmentModel.update(body, body.id)

			return new Success({
				name: "UpdateAppointmentSuccess",
				message: "Cita actualizada exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "UpdateAppointmentError",
				message: "",
				error,
			}
		}
	}

	async getAllAppointments() {
		try {
			const appointmentModel = new _appointment()
			let appointments = await appointmentModel.findAll()

			return new Success({
				name: "GetAllAppointmentsSuccess",
				message: "Citas obtenidas exitosamente",
				status: 200,
				data: appointments,
			})
		} catch (error) {
			throw {
				name: "GetAllAppointmentsError",
				message: "",
				error,
			}
		}
	}
}

module.exports = new patientsController()
