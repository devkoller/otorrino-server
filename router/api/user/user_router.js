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
		callback: user.update,
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

router.get("/get-user/:id", [auth.decryptToken], (request, response) => {
	callback({
		request,
		response,
		callback: user.getUser,
	})
})

router.patch("/change-password", [auth.decryptToken], (request, response) => {
	callback({
		request,
		response,
		callback: user.changePassword,
	})
})

router.patch("/upload-profile-image", [], (request, response) => {
	callback({
		request,
		response,
		callback: user.uploadImage,
	})
})

router.get("/get-profile-image/:id", [], (request, response) => {
	callback({
		request,
		response,
		callback: user.userImage,
	})
})

router.get("/list-users", [], (request, response) => {
	callback({
		request,
		response,
		callback: user.getAllUsers,
	})
})

router.get("/list-doctors", [], (request, response) => {
	callback({
		request,
		response,
		callback: user.findDoctors,
	})
})

router.get("/list-published", [], (request, response) => {
	callback({
		request,
		response,
		callback: user.findPublished,
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
