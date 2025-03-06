const { Router } = require("express")
const router = Router()

const user = require("./api/user/user_router")
const service = require("./api/service/service_router")
const medical_office = require("./api/medical_office/medical_office_router")
const patient = require("./api/patient/patient_router")

router.use("/user", user)
router.use("/service", service)
router.use("/medical-office", medical_office)
router.use("/patient", patient)

router.use("*", (request, response) => {
	response.status(404).send({
		success: false,
		message: `Requested path ${request.baseUrl} not found`,
	})
})

module.exports = router
