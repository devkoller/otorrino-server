const { Success, _gender } = require("../../models")

class dataController {
	constructor() {
		this.getGenders = this.getGenders.bind(this)
	}

	async getGenders() {
		try {
			const genderModel = new _gender({})
			const genders = await genderModel.findAll()

			return new Success({
				name: "getGendersSuccessful",
				message: "Genders retrieved successfully",
				status: 200,
				data: genders,
			})
		} catch (error) {
			throw {
				name: "GetGendersError",
				message: "",
				error,
			}
		}
	}
}

module.exports = new dataController()
