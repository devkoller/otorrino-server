const { _db } = require("../../db/index.js")

class permissions {
	constructor() {
		this.create = this.create.bind(this)
		this.findAll = this.findAll.bind(this)
	}

	async create(body) {
		try {
			const db = _db.models.permissions
			const permission = await db.create(body).catch((error) => {
				throw error
			})

			return permission?.dataValues
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
			const db = _db.models.permissions
			const permission = await db
				.findAll({
					where: {
						active: 1,
					},
				})
				.catch((error) => {
					throw error
				})

			return permission?.map((perm) => perm.dataValues)
		} catch (error) {
			throw {
				name: "FindError",
				message: "",
				error,
			}
		}
	}
}

module.exports = permissions
