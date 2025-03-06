const Responses = require("../../models/util/Responses")
const Errors = require("../../models/util/Errors")
const fs = require("fs")
const path = require("path")

const callback = async ({ request, response, callback }) => {
	try {
		const result = await callback(request)

		const resp = new Responses({ ...result })

		if (resp.files) {
			response.status(resp.status).sendFile(resp.getResponse())
		} else if (resp.html) {
			response.status(resp.status).send(resp.getResponse())
		} else {
			response.status(resp.status).send(resp.getResponse())
		}
	} catch (error) {
		const logFilePath = path.join(process.cwd(), "error.log")

		const timestamp = new Date().toISOString()
		const logMessage = `[${timestamp}] ${
			error.stack || error.message
		} - ${JSON.stringify(error)}\n`

		fs.appendFile(logFilePath, logMessage, (err) => {
			if (err) console.error("Error escribiendo en el log:", err)
		})

		const err = new Errors({
			name: "UnknownError",
			message: "An unknown error has occurred",
			cause: `${error}`,
			status: 500,
		})

		const resp = new Responses({ ...err })
		response.status(resp.status).send(resp.getResponse())
	}
}

module.exports = callback
