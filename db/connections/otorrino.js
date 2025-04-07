const { Sequelize } = require("sequelize")

const { initModels } = require("../models/init-models.js")

const DATABASE = process.env.DB_NAME || "hcg"
const USER = process.env.DB_USER || "sa"
const PASSWORD = process.env.DB_PASSWORD || "123456"
const HOST = process.env.DB_HOST || "localhost"
const DIALECT = process.env.DB_DIALECT || "mysql"
const PORT = process.env.DB_PORT || 1433
const DEBUG = process.env.DEBUG || false

const db = new Sequelize(DATABASE, USER, PASSWORD, {
	logging: false,
	host: HOST,
	port: PORT,
	dialect: DIALECT,
	dialectOptions: {},
	timezone: "-06:00",
	// dialectOptions: {
	// 	// useUTC: false,
	// 	// timezone: 'GMT-6'
	// },
	// timezone: 'GMT-06:00'
})

// sequelize.DATE.prototype._stringify = function _stringify (date, options) {
//   date = this._applyTimezone(date, options)

//   return date.format('YYYY-MM-DD HH:mm:ss.SSS')
// }

initModels(db)

module.exports = db
