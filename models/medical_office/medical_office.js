const { _db } = require("../../db/index.js")

class medical_office {
	constructor() {
		this.create = this.create.bind(this)
		this.findById = this.findById.bind(this)
		this.update = this.update.bind(this)
		this.findAll = this.findAll.bind(this)
		this.delete = this.delete.bind(this)
	}

	async create(body) {
		try {
			const db = _db.models.medical_office
			const mo = await db.create(body).catch((error) => {
				throw error
			})

			return mo?.dataValues
		} catch (error) {
			throw {
				name: "CreateError",
				message: "",
				error,
			}
		}
	}

	async findById(id) {
		try {
			const db = _db.models.medical_office
			const mo = await db
				.findOne({
					where: {
						id: id,
						active: 1,
					},
				})
				.catch((error) => {
					throw error
				})

			return mo?.dataValues
		} catch (error) {
			throw {
				name: "FindError",
				message: "",
				error,
			}
		}
	}

	async findAll() {
		try {
			const db = _db.models.medical_office
			const mo = await db
				.findAll({
					where: {
						active: 1,
					},
				})
				.catch((error) => {
					throw error
				})

			return mo?.map((m) => m.dataValues)
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
			const db = _db.models.medical_office
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
			const db = _db.models.medical_office
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

module.exports = medical_office
