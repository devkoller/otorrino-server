class Success {
	constructor({ name, message, status, data, files, html, stringMove, module, move, id_modified }) {
		this.name = name
		this.status = status
		this.message = message || ''
		this.data = data
		this.files = files || null
		this.html = html || null
		this.stringMove = stringMove || ''
		this.module = module || ''
		this.move = move || ''
		this.id_modified = id_modified || 0
	}
}

module.exports = Success
