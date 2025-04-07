const {
	Success,
	Errors,
	_medications,
	_medical_recipe_details,
} = require("../../models")

class medicationsController {
	constructor() {
		this.create = this.create.bind(this)
		this.getAllMedications = this.getAllMedications.bind(this)
		this.updateMedication = this.updateMedication.bind(this)
		this.deleteMedication = this.deleteMedication.bind(this)
	}

	async create(request) {
		const body = request.body
		try {
			const medicationsModel = new _medications()
			await medicationsModel.create(body)

			return new Success({
				name: "CreatedNewMedication",
				message: "Medicamento creado exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "CreateMedicationError",
				message: "",
				error,
			}
		}
	}

	async getAllMedications() {
		try {
			const medicationsModel = new _medical_recipe_details({})
			const medication = await medicationsModel.findMedicalRecipeDetails()

			return new Success({
				name: "GetAllMedications",
				message: "Medicamentos obtenidos exitosamente",
				status: 200,
				data: medication,
			})
		} catch (error) {
			throw {
				name: "GetAllMedicationsError",
				message: "",
				error,
			}
		}
	}

	async updateMedication(req) {
		const body = req.body
		try {
			const medicationsModel = new _medications()
			await medicationsModel.update(body, body.id)

			return new Success({
				name: "UpdateMedicationSuccess",
				message: "Medicamento actualizado exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "UpdateServiceError",
				message: "",
				error,
			}
		}
	}

	async deleteMedication(request) {
		const { id } = request.body
		try {
			const medicationsModel = new _medications()
			await medicationsModel.delete(id)

			return new Success({
				name: "DeleteMedicationSuccess",
				message: "Medicamento eliminado exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "DeleteMedicationError",
				message: "",
				error,
			}
		}
	}
}

module.exports = new medicationsController()
