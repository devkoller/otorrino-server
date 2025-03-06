const { createTransport } = require("nodemailer")

class Mailer {
	constructor() {
		this.transporter = createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_PASSWORD,
			},
		})
		this.sendEmail = this.sendEmail.bind(this)
	}

	async sendEmail(emailOptions) {
		try {
			let info = await this.transporter
				.sendMail(emailOptions)
				.catch((error) => {
					throw {
						name: "Error!",
						message:
							"Ha ocurrido un error al hacer la conexión con el servidor de correos",
						cause: `${error}`,
						status: 500,
					}
				})

			if (!info.accepted) {
				throw new Errors({
					name: "EmailError",
					message: "Ha ocurrido un error al enviar el correo",
					cause: `${info.rejected}`,
					status: 500,
				})
			}

			return info
		} catch (error) {
			console.log(
				"🚀 > file: Mailer.js:42 > Mailer > sendEmail > error:",
				error
			)
			throw error
		}
	}
}

module.exports = new Mailer()
