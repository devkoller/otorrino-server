const { _db } = require("../../db/index.js")
const sequelize = require("sequelize")

class patient {
	constructor() {
		this.create = this.create.bind(this)
		this.findById = this.findById.bind(this)
		this.update = this.update.bind(this)
		this.findAll = this.findAll.bind(this)
	}

	async create(body) {
		try {
			const db = _db.models.patient
			const p = await db.create(body).catch((error) => {
				throw error
			})

			return p?.dataValues
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
			const db = _db.models.patient
			const p = await db
				.findOne({
					logging: console.log,
					include: [
						{
							model: _db.models.patient_address,
						},
						{
							model: _db.models.clinic_history,
							attributes: [
								"id",
								"idPatient",
								"oral",
								"oral_description",
								"nose",
								"nose_description",
								"earing_left",
								"earing_left_description",
								"earing_right",
								"earing_right_description",
								"face",
								"face_description",
								"evolution",
								"idx",
								"plan",
								[
									sequelize.literal(
										"CONVERT_TZ(clinic_histories.updatedAt, '+00:00', '-06:00')"
									),
									"updatedAt",
								],
							],
						},
						{
							model: _db.models.family_history,
						},
						{
							model: _db.models.history,
						},
						{
							model: _db.models.pathological_history,
						},
					],
					where: {
						id,
					},
					order: [[_db.models.clinic_history, "updatedAt", "desc"]],
				})
				.catch((error) => {
					console.log("🚀 > patient.js:38 > patient > findById > error:", error)
					throw error
				})

			return p?.dataValues
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
			const db = _db.models.patient
			const p = await db
				.findAll({
					where: {
						active: 1,
					},
				})
				.catch((error) => {
					throw error
				})

			return p?.map((pat) => pat.dataValues)
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
			const db = _db.models.patient
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
}

module.exports = patient
