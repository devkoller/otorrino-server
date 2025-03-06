const { Router } = require("express")

const { user } = require("../../../controllers")
const { auth } = require("../../../middlewares")
const { callback } = require("../../../util")

const router = Router()

// user routes
router.post("/create", [], (request, response) => {
	callback({
		request,
		response,
		callback: user.create,
	})
})

router.patch("/update-user", [], (request, response) => {
	callback({
		request,
		response,
		callback: user.updateUser,
	})
})

router.post("/login", [], (request, response) => {
	callback({
		request,
		response,
		callback: user.login,
	})
})

router.get("/check-session", [auth.decryptToken], (request, response) => {
	callback({
		request,
		response,
		callback: user.checkMyGrants,
	})
})

router.get("/list-users", [], (request, response) => {
	callback({
		request,
		response,
		callback: user.getAllUsers,
	})
})

// user permissions routes
router.post("/create-permission", [], (request, response) => {
	callback({
		request,
		response,
		callback: user.createPermission,
	})
})

router.get("/get-permissions", [], (request, response) => {
	callback({
		request,
		response,
		callback: user.getAllPermissions,
	})
})

router.post("/update-permission", [], (request, response) => {
	callback({
		request,
		response,
		callback: user.updateGrants,
	})
})

module.exports = router
