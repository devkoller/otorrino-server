const { _db } = require("../../db/index.js")

class gender {
	constructor() {
		this.findAll = this.findAll.bind(this)
	}

	async findAll() {
		try {
			const db = _db.models.gender
			const gen = await db.findAll().catch((error) => {
				throw error
			})

			return gen?.map((perm) => perm.dataValues)
		} catch (error) {
			throw {
				name: "FindError",
				message: "",
				error,
			}
		}
	}
}

module.exports = gender
