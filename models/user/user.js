const { _db } = require("../../db/index.js")

class usuarios {
	constructor() {
		this.create = this.create.bind(this)
		this.findByEmail = this.findByEmail.bind(this)
		this.findById = this.findById.bind(this)
		this.update = this.update.bind(this)
		this.findAll = this.findAll.bind(this)
		this.findDoctors = this.findDoctors.bind(this)
		this.findPublished = this.findPublished.bind(this)
	}

	async create(body) {
		try {
			const db = _db.models.users
			const user = await db.create(body).catch((error) => {
				throw error
			})

			return user?.dataValues
		} catch (error) {
			throw {
				name: "CreateError",
				message: "Error creating usuario > usuario model",
				error,
			}
		}
	}

	async findByEmail(email) {
		try {
			const db = _db.models.users
			const user = await db
				.findOne({
					where: {
						email,
						active: 1,
					},
				})
				.catch((error) => {
					throw error
				})

			return user?.dataValues
		} catch (error) {
			throw {
				name: "FindError",
				message: "",
				error,
			}
		}
	}

	async findById(id) {
		try {
			const db = _db.models.users
			const user = await db
				.findOne({
					where: {
						id,
						active: 1,
					},
				})
				.catch((error) => {
					throw error
				})

			return user?.dataValues
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
			const db = _db.models.users
			const user = await db
				.findAll({
					attributes: [
						"id",
						"name",
						"lastname1",
						"lastname2",
						"phone",
						"birthdate",
						"academic",
						"image",
						"email",
						"speciality",
						"description",
						"isPublished",
						"isDoctor",
					],
					where: {
						active: 1,
					},
				})
				.catch((error) => {
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
	async findDoctors() {
		try {
			const db = _db.models.users
			const user = await db
				.findAll({
					attributes: [
						"id",
						"name",
						"lastname1",
						"lastname2",
						"academic",
						"image",
					],
					where: {
						active: 1,
						isDoctor: 1,
					},
				})
				.catch((error) => {
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
	async findPublished() {
		try {
			const db = _db.models.users
			const user = await db
				.findAll({
					attributes: [
						"id",
						"name",
						"lastname1",
						"lastname2",
						"academic",
						"image",
						"description",
					],
					where: {
						active: 1,
						isPublished: 1,
					},
				})
				.catch((error) => {
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
			const db = _db.models.users
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
}

module.exports = usuarios
