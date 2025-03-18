const { Router } = require("express")

const { medications } = require("../../../controllers")
const { auth } = require("../../../middlewares")
const { callback } = require("../../../util")

const router = Router()

// user routes
router.post("/create", [], (request, response) => {
	callback({
		request,
		response,
		callback: medications.create,
	})
})

router.patch("/update", [], (request, response) => {
	callback({
		request,
		response,
		callback: medications.updateMedication,
	})
})

router.get("/list", [], (request, response) => {
	callback({
		request,
		response,
		callback: medications.getAllMedications,
	})
})

router.delete("/delete", [], (request, response) => {
	callback({
		request,
		response,
		callback: medications.deleteMedication,
	})
})

module.exports = router
