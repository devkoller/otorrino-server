const {
	Success,
	Errors,
	_users,
	_permissions,
	_user_permissions,
} = require("../../models")
const jwt = require("jsonwebtoken")
const CryptoJS = require("crypto-js")

class userController {
	constructor() {
		this.create = this.create.bind(this)
		this.login = this.login.bind(this)
		this.checkMyGrants = this.checkMyGrants.bind(this)
		this.getAllUsers = this.getAllUsers.bind(this)
		this.createPermission = this.createPermission.bind(this)
		this.getAllPermissions = this.getAllPermissions.bind(this)
		this.updateGrants = this.updateGrants.bind(this)

		this.findUser = this.findUser.bind(this)
		this.deleteUser = this.deleteUser.bind(this)
		this.verifyPermission = this.verifyPermission.bind(this)
	}

	async create(request) {
		const body = request.body
		try {
			// const apellido = body.ape1.split(" ")
			// const password = body.nombre.charAt(0) + apellido[0].toLowerCase()
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

	async login(request) {
		const { email, password, keepSessionOpen } = request.body
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
						keepSessionOpen,
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

	async findUser(request) {
		const { id } = request.params
		try {
			const usuariosModel = new _usuarios({
				id: id,
			})
			const usuario = await usuariosModel.findById()

			return new Success({
				name: "LoginSuccessful",
				message: "Login successful",
				status: 200,
				data: {
					...usuario,
					password: null,
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

	async updateUser(request) {
		try {
			let body = request.body
			delete body.password

			const usuarioModel = new _users()
			await usuarioModel.update(body, body.id)

			return new Success({
				name: "UpdateUserSuccessful",
				message: "Usuario actualizado exitosamente",
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

	async updatePassword(request) {
		const { auth, password, newPassword, newPasswordC } = request.body
		try {
			if (newPassword !== newPasswordC) {
				throw new Errors({
					name: "PasswordNotMatch",
					message: "Las contraseñas no coinciden",
					status: 404,
				})
			}

			const usuarioModel = new _usuarios({
				id: auth.user.id,
				password: newPassword,
			})
			const usuario = await usuarioModel.findById()

			const key = process.env.SECRET_KEY || "secret"
			const bytes = CryptoJS.AES.decrypt(usuario.password, key)
			const decrypted = bytes.toString(CryptoJS.enc.Utf8)

			if (decrypted !== password)
				throw new Errors({
					name: "UserNotFound",
					message: "La contraseña actual no coincide",
					status: 404,
				})

			await usuarioModel.updatePassword()

			return new Success({
				name: "CreatedNewUser",
				message: "Usuario creado exitosamente",
				status: 200,
			})
		} catch (error) {
			console.log(
				"🚀 > file: user_controller.js:234 > userController > updatePassword > error:",
				error
			)
			throw {
				name: "CreateUserError",
				message: "Error creating new user > user controller",
			}
		}
	}

	async deleteUser(request) {
		const { id } = request.body
		try {
			const usuarioModel = new _usuarios({
				id,
			})
			await usuarioModel.delete()

			return new Success({
				name: "DeleteUserSuccessful",
				message: "Usuario eliminado exitosamente",
				status: 200,
			})
		} catch (error) {
			console.log(
				"🚀 > file: user_controller.js:336 > userController > deleteUser > error:",
				error
			)
			throw {
				name: "DeleteUserError",
				message: "Error deleting user > user controller",
			}
		}
	}

	async verifyPermission(request, grants) {
		let userGrants = await this.checkMyGrants(request)
		if (!userGrants) return false
		return userGrants.data.Statement[0].Action.includes(grants)
	}
}

module.exports = new userController()
