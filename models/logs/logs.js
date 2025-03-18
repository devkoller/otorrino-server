const { _db } = require("../../db/index.js")

class logs {
	constructor() {
		this.create = this.create.bind(this)
		this.findAll = this.findAll.bind(this)
	}

	async create(body) {
		try {
			const db = _db.models.logs
			const log = await db.create(body).catch((error) => {
				throw error
			})

			return log?.dataValues
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
			const db = _db.models.logs
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
}

module.exports = logs
