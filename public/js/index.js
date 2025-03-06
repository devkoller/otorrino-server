const urlApi = '/api'

const getHeaders = () => {
  return {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

const handleResponse = async res => {
  const data = await res.clone().json()
  if (!res.ok || data.message === 'err') {
    const err =
      data.message || data.label || 'Ha ocurrido un error en la solicitud'
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `(${err})`,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      toast: true,
      position: 'top-end'
    })
    throw err
  } else {
    return data
  }
}

const handleErrror = err => {
  if (err.message !== undefined)
    Swal.fire({
      icon: 'error',
      title: 'No se pudo contactar con el servidor:',
      text: `(${err.message})`,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      toast: true,
      position: 'top-end'
    })
  throw err
}

const checkServer = async data => {
  const requestOptions = {
    method: 'GET',
    headers: getHeaders()
  }
  let res = await fetch(`${urlApi}`, requestOptions)
    .then(handleResponse)
    .catch(handleErrror)

  setServerData(res)
}

const setServerData = data => {
  document.getElementById('serverName').innerHTML = data.serverName
  document.getElementById('version').innerHTML = data.version
  document.getElementById('status').innerHTML = data.status
}

checkServer()
