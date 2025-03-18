const { _db } = require("../../db/index.js")

class medical_recipe {
	constructor() {
		this.create = this.create.bind(this)
		this.delete = this.delete.bind(this)
		this.findAll = this.findAll.bind(this)
		this.findByClinic = this.findByClinic.bind(this)
	}

	async create(body) {
		try {
			const db = _db.models.medical_recipe
			const recipe = await db.create(body).catch((error) => {
				throw error
			})

			return recipe?.dataValues
		} catch (error) {
			throw {
				name: "CreateError",
				message: "",
				error,
			}
		}
	}

	async findAll() {
		try {
			const db = _db.models.medical_recipe
			const user = await db.findAll({}).catch((error) => {
				throw error
			})

			return user?.map((user) => user.dataValues)
		} catch (error) {
			throw {
				name: "FindError",
				message: "",
				error,
			}
		}
	}

	async findByClinic(id_clinic) {
		try {
			const db = _db.models.medical_recipe
			const clinic = await db
				.findOne({
					include: [
						{
							model: _db.models.medical_recipe_details,
							include: [
								{
									model: _db.models.medications,
								},
							],
						},
					],
					where: {
						idClinic: id_clinic,
					},
				})
				.catch((error) => {
					throw error
				})

			return clinic?.dataValues
		} catch (error) {
			throw {
				name: "FindError",
				message: "",
				error,
			}
		}
	}

	async delete(id) {
		try {
			const db = _db.models.medical_recipe
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

module.exports = medical_recipe
