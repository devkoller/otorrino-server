const { _db } = require("../../db/index.js")

class medical_recipe_details {
	constructor() {
		this.create = this.create.bind(this)
		this.delete = this.delete.bind(this)
	}

	async create(body) {
		try {
			const db = _db.models.medical_recipe_details
			const user = await db.create(body).catch((error) => {
				throw error
			})

			return user?.dataValues
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
			const db = _db.models.medical_recipe_details
			await db
				.update({
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

module.exports = medical_recipe_details
