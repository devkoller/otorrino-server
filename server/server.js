const express = require("express")
const http = require("http")
const bodyParser = require("body-parser")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const apiRouter = require("../router")

class ServerApi {
	constructor() {
		this.app = express()
		this.port = process.env.PORT || 3000
		this.server = http.createServer(this.app)
		this.apiPaths = {
			api: "/api",
		}
		this.corsOptions = {
			origin: "*",
			methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
			optionsSuccessStatus: 200,
		}

		this.middleware()

		this.info()

		this.routes()
	}

	middleware() {
		// CORS
		this.app.use(cors(this.corsOptions))

		this.app.use(bodyParser.json())
		this.app.use(fileUpload())
		this.app.use(
			bodyParser.urlencoded({
				extended: true,
			})
		)

		// Public directory
		this.app.use(express.static("public"))
	}

	sockets() {
		this.io.on("connection", socketController)
	}

	info() {
		this.app.get(this.apiPaths.api, (request, response) => {
			response.send({
				serverName: "MedicaOtorrino Server",
				version: "1.0.0-beta",
				status: "ONLINE",
			})
		})
	}

	routes() {
		this.app.use("/", apiRouter)
	}

	listen() {
		this.server.listen(this.port, () => {
			console.log("Server running on port " + this.port)
		})
	}

	getIo() {
		return this.io
	}
}

module.exports = ServerApi
