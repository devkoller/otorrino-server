const ErrorName = ['SequelizeConnectionError', 'SequelizeDatabaseError', 'UnknownError', 'Resource not found']
class Errors extends Error {
	constructor({ name, message, status }) {
		super()
		this.name = name
		this.message = status === 500 ? 'Ha ocurrido un error inesperado' : message || ''
		this.status = status || 500
	}
}

module.exports = Errors
