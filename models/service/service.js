const { _db } = require("../../db/index.js")

class services {
	constructor() {
		this.create = this.create.bind(this)
		this.update = this.update.bind(this)
		this.findAll = this.findAll.bind(this)
		this.delete = this.delete.bind(this)
	}

	async create(body) {
		try {
			const db = _db.models.services
			const service = await db.create(body).catch((error) => {
				throw error
			})

			return service?.dataValues
		} catch (error) {
			throw {
				name: "CreateError",
				message: "",
				error,
			}
		}
	}

	async findAll(qs) {
		try {
			const db = _db.models.services
			const service = await db
				.findAll({
					where: {
						...qs,
						active: 1,
					},
				})
				.catch((error) => {
					throw error
				})

			return service?.map((serv) => serv.dataValues)
		} catch (error) {
			throw {
				name: "FindError",
				message: "",
				error,
			}
		}
	}

	async update(body, id) {
		try {
			const db = _db.models.services
			await db
				.update(body, {
					where: {
						id: id,
					},
				})
				.catch((error) => {
					throw error
				})
		} catch (error) {
			throw {
				name: "UpdateError",
				message: "",
				error,
			}
		}
	}

	async delete({ id }) {
		try {
			const db = _db.models.services
			await db
				.destroy({
					where: {
						id: id,
					},
				})
				.catch((error) => {
					throw error
				})
		} catch (error) {
			throw {
				name: "UpdateError",
				message: "",
				error,
			}
		}
	}
}

module.exports = services
