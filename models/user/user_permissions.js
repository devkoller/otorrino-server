const { _db } = require("../../db/index.js")

class user_permissions {
	constructor() {
		this.create = this.create.bind(this)
		this.delete = this.delete.bind(this)
		this.find = this.find.bind(this)
	}

	async create(body) {
		try {
			const db = _db.models.user_permissions
			const up = await db.create(body).catch((error) => {
				throw error
			})

			return up?.dataValues
		} catch (error) {
			throw {
				name: "CreateError",
				message: "",
				error,
			}
		}
	}

	async find({ id_user, id_permission }) {
		try {
			const db = _db.models.user_permissions
			const up = await db
				.findOne({
					where: {
						id_user,
						id_permission,
					},
				})
				.catch((error) => {
					throw error
				})

			return up?.dataValues
		} catch (error) {
			throw {
				name: "CreateError",
				message: "",
				error,
			}
		}
	}

	async delete({ id_user, id_permission }) {
		try {
			const db = _db.models.user_permissions
			await db
				.destroy(body, {
					where: {
						id_user,
						id_permission,
					},
				})
				.catch((error) => {
					throw error
				})
		} catch (error) {
			throw {
				name: "UpdateError",
				message: "",
			}
		}
	}
}

module.exports = user_permissions
