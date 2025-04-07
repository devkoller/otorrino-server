const { _db } = require("../../db/index.js")
const { Op } = require("sequelize")

class appointment {
	constructor() {
		this.create = this.create.bind(this)
		this.update = this.update.bind(this)
		this.findAll = this.findAll.bind(this)
		this.findAllByPatient = this.findAllByPatient.bind(this)
	}

	async create(body) {
		try {
			const db = _db.models.appointment
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

	async update(body, id) {
		try {
			const db = _db.models.appointment
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

	async findAll() {
		try {
			const db = _db.models.appointment
			const p = await db
				.findAll({
					include: [
						{
							model: _db.models.patient,
							attributes: ["id", "name", "lastname1", "lastname2", "phone"],
						},
						{
							model: _db.models.users,
							attributes: ["id", "academic", "name", "lastname1", "lastname2"],
						},
					],
					where: {
						status: {
							[Op.in]: [1, 2],
						},
					},
				})
				.catch((error) => {
					throw error
				})

			return p.map((item) => {
				let appointment = item.dataValues
				return {
					...appointment,
					date: `${appointment.dateAppointment}T${appointment.startTime}:00`,
					patientName: `${appointment.patient.name} ${appointment.patient.lastname1} ${appointment.patient.lastname2}`,
					patientPhone: appointment.patient.phone,
					doctorName: `${appointment.user.name} ${appointment.user.lastname1} ${appointment.user.lastname2}`,
				}
			})
		} catch (error) {
			throw {
				name: "CreateError",
				message: "",
				error,
			}
		}
	}

	async findAllByPatient(patientId) {
		try {
			const db = _db.models.appointment
			const p = await db
				.findAll({
					include: [
						{
							model: _db.models.patient,
							attributes: ["id", "name", "lastname1", "lastname2", "phone"],
						},
						{
							model: _db.models.users,
							attributes: ["id", "academic", "name", "lastname1", "lastname2"],
						},
					],
					where: {
						patientId: patientId,
						status: {
							[Op.in]: [1, 2],
						},
					},
				})
				.catch((error) => {
					throw error
				})

			return p.map((item) => {
				let appointment = item.dataValues
				return {
					...appointment,
					date: `${appointment.dateAppointment}T${appointment.startTime}:00`,
					patientName: `${appointment.patient.name} ${appointment.patient.lastname1} ${appointment.patient.lastname2}`,
					patientPhone: appointment.patient.phone,
					doctorName: `${appointment.user.name} ${appointment.user.lastname1} ${appointment.user.lastname2}`,
				}
			})
		} catch (error) {
			throw {
				name: "FindAllByPatientError",
				message: "",
				error,
			}
		}
	}
}

module.exports = appointment
