const {
	Success,
	Errors,
	_users,
	_permissions,
	_user_permissions,
} = require("../../models")
const jwt = require("jsonwebtoken")
const CryptoJS = require("crypto-js")
const path = require("path")
const fs = require("fs")

class userController {
	constructor() {
		this.create = this.create.bind(this)
		this.update = this.update.bind(this)
		this.changePassword = this.changePassword.bind(this)
		this.getUser = this.getUser.bind(this)
		this.login = this.login.bind(this)
		this.checkMyGrants = this.checkMyGrants.bind(this)
		this.getAllUsers = this.getAllUsers.bind(this)
		this.createPermission = this.createPermission.bind(this)
		this.getAllPermissions = this.getAllPermissions.bind(this)
		this.updateGrants = this.updateGrants.bind(this)

		this.findDoctors = this.findDoctors.bind(this)
		this.findPublished = this.findPublished.bind(this)
	}

	async create(request) {
		const body = request.body
		try {
			const usuarioModel = new _users()
			await usuarioModel.create(body)

			// const account = fs.readFileSync(
			// 	path.join(__dirname, "../../messages/envio_pdf.html"),
			// 	"utf8"
			// )
			// const html = account
			// 	.replace(
			// 		"{{nombre}}",
			// 		`${persona.nombre} ${persona.ape1} ${persona.ape2 || ""}`
			// 	)
			// 	.replace("{{username}}", usuario.username)
			// 	.replace("{{password}}", password)

			// const from = process.env.EMAIL

			// const mailOptions = {
			// 	from: `NO REPLY <${from}>`,
			// 	to: body.correo,
			// 	subject: "Bienvenido/a a Meditiva - Acceso al Sistema",
			// 	html,
			// }

			// await mailer.sendEmail(mailOptions)

			return new Success({
				name: "CreatedNewUser",
				message: "Usuario creado exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "CreateUserError",
				message: "",
				error,
			}
		}
	}

	async update({ body }) {
		try {
			const usuarioModel = new _users()
			await usuarioModel.update(body, body.id)

			// const account = fs.readFileSync(
			// 	path.join(__dirname, "../../messages/envio_pdf.html"),
			// 	"utf8"
			// )
			// const html = account
			// 	.replace(
			// 		"{{nombre}}",
			// 		`${persona.nombre} ${persona.ape1} ${persona.ape2 || ""}`
			// 	)
			// 	.replace("{{username}}", usuario.username)
			// 	.replace("{{password}}", password)

			// const from = process.env.EMAIL

			// const mailOptions = {
			// 	from: `NO REPLY <${from}>`,
			// 	to: body.correo,
			// 	subject: "Bienvenido/a a Meditiva - Acceso al Sistema",
			// 	html,
			// }

			// await mailer.sendEmail(mailOptions)

			return new Success({
				name: "CreatedNewUser",
				message: "Usuario creado exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "CreateUserError",
				message: "",
				error,
			}
		}
	}

	async uploadImage({ body, files }) {
		let { id } = body
		try {
			let file = files.profile_image
			const usuarioModel = new _users()

			let updateUser = {
				image: "webp",
			}
			await usuarioModel.update(updateUser, id)

			let pathImage = path.join(__dirname, `../../public/img/${id}.webp`)

			file.mv(pathImage, (err) => {
				if (err) {
					throw {
						name: "UploadImageError",
						message: "Error uploading image",
						error: err,
					}
				}
			})

			return new Success({
				name: "UploadImageSuccess",
				message: "Imagen subida exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "UploadImageError",
				message: "",
				error,
			}
		}
	}

	async userImage({ params }) {
		let { id } = params
		try {
			let pathImage = path.join(__dirname, `../../public/img/${id}.webp`)

			if (!fs.existsSync(pathImage)) {
				throw new Errors({
					name: "ImageNotFound",
					message: "Image not found",
					status: 404,
				})
			}

			return new Success({
				name: "UploadImageSuccess",
				message: "Imagen subida exitosamente",
				files: pathImage,
				status: 200,
			})
		} catch (error) {
			throw {
				name: "UploadImageError",
				message: "",
				error,
			}
		}
	}

	async changePassword({ body }) {
		try {
			const usuarioModel = new _users()
			await usuarioModel.update(body, body.id)

			// const account = fs.readFileSync(
			// 	path.join(__dirname, "../../messages/envio_pdf.html"),
			// 	"utf8"
			// )
			// const html = account
			// 	.replace(
			// 		"{{nombre}}",
			// 		`${persona.nombre} ${persona.ape1} ${persona.ape2 || ""}`
			// 	)
			// 	.replace("{{username}}", usuario.username)
			// 	.replace("{{password}}", password)

			// const from = process.env.EMAIL

			// const mailOptions = {
			// 	from: `NO REPLY <${from}>`,
			// 	to: body.correo,
			// 	subject: "Bienvenido/a a Meditiva - Acceso al Sistema",
			// 	html,
			// }

			// await mailer.sendEmail(mailOptions)

			return new Success({
				name: "CreatedNewUser",
				message: "Usuario creado exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "CreateUserError",
				message: "",
				error,
			}
		}
	}

	async login(request) {
		const { email, password, keepSessionOpen = "false" } = request.body
		try {
			const usuariosModel = new _users()
			const usuario = await usuariosModel.findByEmail(email)
			if (!usuario)
				throw new Errors({
					name: "UserNotFound",
					message: "Usuario no encontrado y/o contraseña incorrecta",
					status: 404,
				})

			const key = process.env.SECRET_KEY || "secret"
			const bytes = CryptoJS.AES.decrypt(usuario.password, key)
			const decrypted = bytes.toString(CryptoJS.enc.Utf8)

			if (decrypted !== password)
				throw new Errors({
					name: "UserNotFound",
					message: "Usuario no encontrado y/o contraseña incorrecta",
					status: 404,
				})

			const token = jwt.sign(
				{
					user: {
						id: usuario.id,
						keepSessionOpen: keepSessionOpen ? true : false,
					},
				},
				process.env.TOKEN_KEY,
				{
					expiresIn: keepSessionOpen ? "365d" : process.env.TOKEN_LIFE,
				}
			)

			return new Success({
				name: "LoginSuccessful",
				message: "Login successful",
				status: 200,
				data: {
					token,
					id: usuario.id,
					name: usuario.name,
					lastname1: usuario.lastname1,
					lastname2: usuario.lastname2,
					email: usuario.email,
					keepSessionOpen,
				},
			})
		} catch (error) {
			const logFilePath = path.join(process.cwd(), "error.log")

			const timestamp = new Date().toISOString()
			const logMessage = `[${timestamp}] ${
				error.stack || error.message
			} - ${JSON.stringify(error)}\n`

			fs.appendFile(logFilePath, logMessage, (err) => {
				if (err) console.error("Error escribiendo en el log:", err)
			})
			throw {
				name: "LoginError",
				message: "",
				error,
			}
		}
	}

	async getUser({ params }) {
		const { id } = params
		try {
			const usuariosModel = new _users()
			const usuario = await usuariosModel.findById(id)

			if (!usuario)
				throw new Errors({
					name: "UserNotFound",
					message: "Usuario no encontrado y/o contraseña incorrecta",
					status: 404,
				})

			return new Success({
				name: "LoginSuccessful",
				message: "Login successful",
				status: 200,
				data: {
					id: usuario.id,
					name: usuario.name,
					lastname1: usuario.lastname1,
					lastname2: usuario.lastname2,
					email: usuario.email,
					description: usuario.description,
					speciality: usuario.speciality,
				},
			})
		} catch (error) {
			const logFilePath = path.join(process.cwd(), "error.log")

			const timestamp = new Date().toISOString()
			const logMessage = `[${timestamp}] ${
				error.stack || error.message
			} - ${JSON.stringify(error)}\n`

			fs.appendFile(logFilePath, logMessage, (err) => {
				if (err) console.error("Error escribiendo en el log:", err)
			})
			throw {
				name: "LoginError",
				message: "",
				error,
			}
		}
	}

	async checkMyGrants(request) {
		const { auth } = request.body
		try {
			const usuarioModel = new _users()
			const usuario = await usuarioModel.findById(auth.user.id)

			return new Success({
				name: "UpdateGrantsSuccessful",
				message: "Permisos actualizados exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "CheckMyGrantsError",
				message: "Error checking my grants > user controller",
				error,
			}
		}
	}

	async getAllUsers() {
		try {
			const usuariosModel = new _users({})
			const usuarios = await usuariosModel.findAll()

			return new Success({
				name: "GetAllUsersSuccessful",
				message: "Usuarios encontrados exitosamente",
				status: 200,
				data: usuarios,
			})
		} catch (error) {
			throw {
				name: "GetAllUsersError",
				message: "Error getting all users > user controller",
				error,
			}
		}
	}

	async createPermission(request) {
		const body = request.body
		try {
			const permissionsModel = new _permissions()
			await permissionsModel.create(body)

			return new Success({
				name: "createPermissionSuccessful",
				message: "Permiso creado exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "CreateUserError",
				message: "",
				error,
			}
		}
	}

	async getAllPermissions() {
		try {
			const permissionsModel = new _permissions()
			let permissions = await permissionsModel.findAll()

			return new Success({
				name: "createPermissionSuccessful",
				message: "Permiso creado exitosamente",
				status: 200,
				data: permissions,
			})
		} catch (error) {
			throw {
				name: "CreateUserError",
				message: "",
				error,
			}
		}
	}

	async updateGrants(request) {
		const body = request.body
		try {
			const usuarioModel = new _user_permissions()
			let permiso = await usuarioModel.find(body)

			if (permiso) {
				await usuarioModel.delete(body)
			} else {
				await usuarioModel.create(body)
			}

			return new Success({
				name: "UpdateGrantsSuccessful",
				message: "Permisos actualizados exitosamente",
				status: 200,
			})
		} catch (error) {
			throw {
				name: "UpdateGrantsError",
				message: "",
				error,
			}
		}
	}

	async findDoctors() {
		try {
			const usuariosModel = new _users()
			const usuario = await usuariosModel.findDoctors()

			return new Success({
				name: "LoginSuccessful",
				message: "Login successful",
				status: 200,
				data: usuario,
			})
		} catch (error) {
			throw {
				name: "FindUserError",
				message: "Error LoginError > user controller",
			}
		}
	}

	async findPublished() {
		try {
			const usuariosModel = new _users()
			const usuario = await usuariosModel.findPublished()

			return new Success({
				name: "LoginSuccessful",
				message: "Login successful",
				status: 200,
				data: {
					...usuario,
				},
			})
		} catch (error) {
			console.log(
				"🚀 > file: user_controller.js:106 > userController > findUser > error:",
				error
			)
			throw {
				name: "FindUserError",
				message: "Error LoginError > user controller",
			}
		}
	}
}

module.exports = new userController()
