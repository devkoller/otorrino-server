const { Success, _medical_office } = require("../../models")
class medical_officeController {
	constructor() {
		this.create = this.create.bind(this)
		this.update = this.update.bind(this)
		this.findAll = this.findAll.bind(this)
		this.delete = this.delete.bind(this)
	}

	async create(req) {
		const body = req.body
		try {
			const moModel = new _medical_office()
			await moModel.create(body)

			return new Success({
				name: "CreatedMedicalOfficeSuccess",
				message: "Consultorio creado exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "CreateMedicalOfficeError",
				message: "",
				error,
			}
		}
	}

	async update(req) {
		const body = req.body
		try {
			const moModel = new _medical_office()
			await moModel.update(body, body.id)

			return new Success({
				name: "UpdateMedicalOfficeSuccess",
				message: "Consultorio actualizado exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "UpdateMedicalOfficeError",
				message: "",
				error,
			}
		}
	}

	async findAll() {
		try {
			const moModel = new _medical_office()
			let mos = await moModel.findAll()

			return new Success({
				name: "GetAllMedicalOfficeSuccess",
				message: "Consultorios obtenidos exitosamente",
				status: 200,
				data: mos,
			})
		} catch (error) {
			throw {
				name: "GetAllMedicalOfficeError",
				message: "",
				error,
			}
		}
	}

	async delete(req) {
		const body = req.body
		try {
			const moModel = new _medical_office()
			await moModel.delete(body)

			return new Success({
				name: "DeleteMedicalOfficeSuccess",
				message: "Consultorio eliminado exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "DeleteMedicalOfficeError",
				message: "",
				error,
			}
		}
	}
}

module.exports = new medical_officeController()
