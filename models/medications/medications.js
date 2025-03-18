const { _db } = require("../../db/index.js")

class medications {
	constructor() {
		this.create = this.create.bind(this)
		this.update = this.update.bind(this)
		this.findAll = this.findAll.bind(this)
		this.delete = this.delete.bind(this)
	}

	async create(body) {
		try {
			const db = _db.models.medications
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

	async findAll() {
		try {
			const db = _db.models.medications
			const user = await db.findAll().catch((error) => {
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

	async update(body, id) {
		try {
			const db = _db.models.medications
			await db
				.update(body, {
					where: {
						id: id,
					},
					individualHooks: true,
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

	async delete(id) {
		try {
			const db = _db.models.medications
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

module.exports = medications
