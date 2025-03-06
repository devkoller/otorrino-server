const { Router } = require("express")

const { patient } = require("../../../controllers")
// const { auth, patientMdlw } = require("../../../middlewares")
const { callback } = require("../../../util")

const router = Router()

// patient routes
router.post("/create", [], (request, response) => {
	callback({
		request,
		response,
		callback: patient.createPatient,
	})
})

router.get("/get-all", [], (request, response) => {
	callback({
		request,
		response,
		callback: patient.getAllPatients,
	})
})

router.get("/get/:id", [], (request, response) => {
	callback({
		request,
		response,
		callback: patient.getPatient,
	})
})

// router.get("/pdf/:id", [], (request, response) => {
// 	callback({
// 		request,
// 		response,
// 		callback: patient.makePDFHistory,
// 	})
// })
router.get("/pdf/:id", [], patient.makePDFHistory)

// patients create histories
router.post("/create-clinic-history", [], (request, response) => {
	callback({
		request,
		response,
		callback: patient.createClinicHistory,
	})
})

router.post("/create-pathological-history", [], (request, response) => {
	callback({
		request,
		response,
		callback: patient.createPathologicalHistory,
	})
})

router.post("/create-family-history", [], (request, response) => {
	callback({
		request,
		response,
		callback: patient.createFamilyHistory,
	})
})

router.post("/create-history", [], (request, response) => {
	callback({
		request,
		response,
		callback: patient.createHistory,
	})
})

router.post("/create-address", [], (request, response) => {
	callback({
		request,
		response,
		callback: patient.createAddress,
	})
})

// patients update histories
router.put("/update-clinic-history", [], (request, response) => {
	callback({
		request,
		response,
		callback: patient.updateClinicHistory,
	})
})

router.put("/update-pathological-history", [], (request, response) => {
	callback({
		request,
		response,
		callback: patient.updatePathologicalHistory,
	})
})

router.put("/update-family-history", [], (request, response) => {
	callback({
		request,
		response,
		callback: patient.updateFamilyHistory,
	})
})

router.put("/update-history", [], (request, response) => {
	callback({
		request,
		response,
		callback: patient.updateHistory,
	})
})

router.put("/update-address", [], (request, response) => {
	callback({
		request,
		response,
		callback: patient.updateAddress,
	})
})

module.exports = router
