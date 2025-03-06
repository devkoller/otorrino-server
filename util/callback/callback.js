const Responses = require("../../models/util/Responses")
const Errors = require("../../models/util/Errors")

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
		console.log(error)
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
