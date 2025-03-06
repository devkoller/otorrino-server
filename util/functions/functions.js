const toMinutes = (time) => {
	return parseInt(time.split(':').reduce((h, m) => h * 60 + +parseInt(m), 0))
}

const toString = (time) => {
	let hours = Math.floor(time / 60)
		.toString()
		.replace(/\b\d\b/, '0$&')
	let minutes = Math.floor(time % 60)
		.toString()
		.replace(/\b\d\b/, '0$&')
	return `${hours}:${minutes}`
}

const addTime = (time, duration) => {
	const minutes = toMinutes(time) + parseInt(duration)

	return toString(minutes)
}

const firstLetterUppercase = (text) => {
	return text.charAt(0).toUpperCase() + text.slice(1)
}

function formatDateToSql(fecha) {
	// Dividir la fecha en día, mes y año usando el separador "/"
	const [dia, mes, anio] = fecha.split('/')

	// Retornar la fecha en el nuevo formato "aaaa/mm/dd"
	return `${anio}-${mes}-${dia}`
}

function dateStringToDate(fechaStr) {
	const partes = fechaStr.split('/')
	const dia = parseInt(partes[0], 10)
	const mes = parseInt(partes[1], 10) - 1
	const anio = parseInt(partes[2], 10)
	return new Date(anio, mes, dia)
}

function sqlFormatToDate(sqlDate) {
	const date = new Date(`${sqlDate}T00:00:00`)
	const day = String(date.getDate()).padStart(2, '0') // Día con dos dígitos
	const month = String(date.getMonth() + 1).padStart(2, '0') // Mes con dos dígitos
	const year = date.getFullYear() // Año completo

	return `${day}/${month}/${year}`
}

module.exports = {
	toMinutes,
	toString,
	addTime,
	firstLetterUppercase,
	formatDateToSql,
	dateStringToDate,
	sqlFormatToDate,
}
