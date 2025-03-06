const jwt = require("jsonwebtoken")

class auth {
	controller() {
		this.decryptToken = this.decryptToken.bind(this)
	}

	async decryptToken(request, response, next) {
		const bearerHeader = request.headers["authorization"]

		if (typeof bearerHeader === "undefined") {
			response.status(404).send({
				auth: false,
				message: "No token provided",
			})
			return
		}

		try {
			const bearer = bearerHeader.split(" ")
			const bearerToken = bearer[1]

			const auth = jwt.decode(bearerToken)

			if (!auth) {
				response.status(406).send({
					auth: false,
					message: "Ha ocurrido un error",
				})
				return
			}

			const keepSessionOpen = auth.user.keepSessionOpen

			if (!keepSessionOpen) {
				jwt.verify(bearerToken, process.env.TOKEN_KEY, (err) => {
					if (err) {
						response.status(401).send({
							auth: false,
							message: "Tu sesión ha expirado",
						})
						return
					}
					request.body.auth = auth
					next()
				})
			} else {
				request.body.auth = auth
				next()
			}
		} catch (error) {
			response.status(500).send({
				auth: false,
				message: "Ha ocurrido un error",
			})
		}
	}
}

module.exports = new auth()
