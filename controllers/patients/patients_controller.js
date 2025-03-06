const {
	Success,
	_patient,
	_patient_address,
	_clinic_history,
	_pathological_history,
	_family_history,
	_history,
} = require("../../models")
const fs = require("fs")
const path = require("path")
const client = require("@jsreport/nodejs-client")(
	process.env.JSREPORT_URL,
	process.env.JSREPORT_USER,
	process.env.JSREPORT_PASSWORD
)

class patientsController {
	constructor() {
		this.createPatient = this.createPatient.bind(this)
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
		const { id } = req.params
		const { id_clinic } = req.query
		try {
			const patientModel = new _patient()
			let patients = await patientModel.findById(id)

			const clinicHistoryModel = new _clinic_history()
			let clinicHistory = await clinicHistoryModel.findById(id_clinic)

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
							width: "21.59cm",
							height: "13.97cm",
						},
						pdfMeta: {
							title: "Historia clínica",
						},
					},
					data: {
						...patients,
						names: `${patients.name} ${patients.lastname1} ${patients.lastname2}`,
						patient_address: {
							shouldItPrint: patients.patient_address ? true : false,
							...patients.patient_address.dataValues,
						},
						clinic: {
							...clinicHistory,
						},
						history: {
							shouldItPrint: patients.history ? true : false,
							...patients.history.dataValues,
						},
						pathological_history: {
							shouldItPrint: patients.pathological_history ? true : false,
							...patients.pathological_history.dataValues,
						},
						family_history: {
							shouldItPrint: patients.family_history ? true : false,
							...patients.family_history.dataValues,
						},
					},
				})
				.then(async (resp) => resp)
			// .catch((error) => {
			// 	console.log(error)
			// 	return response.status(500).send({
			// 		status: 500,
			// 		message: "Error al generar el reporte",
			// 	})
			// })

			resp.pipe(response)

			// return new Success({
			// 	name: "GetAllPatientsSuccess",
			// 	message: "Pacientes obtenidos exitosamente",
			// 	status: 200,
			// 	data: {
			// 		patients,
			// 		clinicHistory,
			// 	},
			// })
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
	async createClinicHistory(req) {
		try {
			const clinicHistoryModel = new _clinic_history()
			await clinicHistoryModel.create(req.body)

			return new Success({
				name: "CreateClinicHistorySuccess",
				message: "Historia clínica creada exitosamente",
				status: 200,
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
}

module.exports = new patientsController()
