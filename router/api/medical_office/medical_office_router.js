const { Router } = require("express")

const { medical_office } = require("../../../controllers")
// const { auth, userMdlw } = require("../../../middlewares")
const { callback } = require("../../../util")

const router = Router()

router.post("/create", [], (request, response) => {
	callback({
		request,
		response,
		callback: medical_office.create,
	})
})

router.put("/update", [], (request, response) => {
	callback({
		request,
		response,
		callback: medical_office.update,
	})
})

router.get("/get-all", [], (request, response) => {
	callback({
		request,
		response,
		callback: medical_office.findAll,
	})
})

router.delete("/delete", [], (request, response) => {
	callback({
		request,
		response,
		callback: medical_office.delete,
	})
})

module.exports = router
