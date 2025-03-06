const { Router } = require("express")

const { services } = require("../../../controllers")
// const { auth, userMdlw } = require("../../../middlewares")
const { callback } = require("../../../util")

const router = Router()

router.post("/create", [], (request, response) => {
	callback({
		request,
		response,
		callback: services.create,
	})
})

router.put("/update", [], (request, response) => {
	callback({
		request,
		response,
		callback: services.update,
	})
})

router.get("/get-all", [], (request, response) => {
	callback({
		request,
		response,
		callback: services.getAll,
	})
})

router.delete("/delete", [], (request, response) => {
	callback({
		request,
		response,
		callback: services.delete,
	})
})

module.exports = router
