const { defineConfig } = require("drizzle-kit")

export default defineConfig({
	schema: "./src/db/schema.js",
	dialect: "mysql",
	out: "./db/schemas",
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
})
