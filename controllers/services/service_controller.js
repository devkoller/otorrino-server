const { Success, _services } = require("../../models")
class servicesController {
	constructor() {
		this.create = this.create.bind(this)
		this.update = this.update.bind(this)
		this.getAll = this.getAll.bind(this)
		this.delete = this.delete.bind(this)
	}

	async create(req) {
		const body = req.body
		try {
			const servicesModel = new _services()
			await servicesModel.create(body)

			return new Success({
				name: "CreateServiceSuccess",
				message: "Servicio creado exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "CreateServiceError",
				message: "",
				error,
			}
		}
	}

	async update(req) {
		const body = req.body
		try {
			const servicesModel = new _services()
			await servicesModel.update(body, body.id)

			return new Success({
				name: "UpdateServiceSuccess",
				message: "Servicio actualizado exitosamente",
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

	async getAll(req) {
		let qs = req.query
		try {
			const servicesModel = new _services()
			let services = await servicesModel.findAll(qs)

			return new Success({
				name: "GetAllServicesSuccess",
				message: "Servicios obtenidos exitosamente",
				status: 200,
				data: services,
			})
		} catch (error) {
			throw {
				name: "GetAllServicesError",
				message: "",
				error,
			}
		}
	}

	async delete(req) {
		const body = req.body
		try {
			const servicesModel = new _services()
			await servicesModel.update(body)

			return new Success({
				name: "DeleteServiceSuccess",
				message: "Servicio eliminado exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "DeleteServiceError",
				message: "",
				error,
			}
		}
	}
}

module.exports = new servicesController()
