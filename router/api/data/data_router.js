const { Router } = require("express")

const { data } = require("../../../controllers")
// const { auth } = require("../../../middlewares")
const { callback } = require("../../../util")

const router = Router()

router.get("/genders", [], (request, response) => {
	callback({
		request,
		response,
		callback: data.getGenders,
	})
})

module.exports = router
