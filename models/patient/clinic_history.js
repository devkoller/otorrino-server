const { _db } = require("../../db/index.js")

class clinic_history {
	constructor() {
		this.create = this.create.bind(this)
		this.update = this.update.bind(this)
		this.findById = this.findById.bind(this)
		this.delete = this.delete.bind(this)
	}

	async create(body) {
		try {
			const db = _db.models.clinic_history
			const p = await db.create(body).catch((error) => {
				throw error
			})

			return p?.dataValues
		} catch (error) {
			throw {
				name: "CreateError",
				message: "",
				error,
			}
		}
	}

	async update(body, id) {
		try {
			const db = _db.models.clinic_history
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

	async findById(id) {
		try {
			const db = _db.models.clinic_history
			const p = await db
				.findOne({
					where: {
						id,
					},
				})
				.catch((error) => {
					throw error
				})

			return p?.dataValues
		} catch (error) {
			throw {
				name: "CreateError",
				message: "",
				error,
			}
		}
	}

	async delete(id) {
		try {
			const db = _db.models.clinic_history
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

module.exports = clinic_history
