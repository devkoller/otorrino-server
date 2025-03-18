const { _db } = require("../../db/index.js")

class patient_assigned {
	constructor() {
		this.create = this.create.bind(this)
		this.delete = this.delete.bind(this)
	}

	async create(body) {
		try {
			const db = _db.models.patient_assigned
			const pat = await db.create(body).catch((error) => {
				throw error
			})

			return pat?.dataValues
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
			const db = _db.models.patient_assigned
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

module.exports = patient_assigned
