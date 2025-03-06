const dotenv = require('dotenv')
dotenv.config()
const SequelizeAuto = require('sequelize-auto')

const output = './db/models/'
const args = process.argv.slice(2)

if (!args.length) {
  console.error('Please provide a table name')
  process.exit(1)
}

const options = {
	directory: output + args[0],
	lang: 'js',
	tables: [args[0]],
}

const config = {
	dialect: process.env.DB_DIALECT,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dbname: process.env.DB_NAME,
	user: process.env.DB_USER,
	pass: process.env.DB_PASSWORD,
	...options,
}

var auto = new SequelizeAuto(config.dbname, config.user, config.pass, config)
auto.run()
