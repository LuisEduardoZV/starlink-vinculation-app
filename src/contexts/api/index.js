/* eslint-disable consistent-return */
export async function apiCall ({
  url,
  method = 'GET',
  headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
}) {
  try {
    const datos = await fetch(url, {
      method,
      headers
    })
      .then(async (response) => {
        if (response.ok) {
          return await response?.json() ?? response.ok
        }
        return false
      })
      .then((data) => data)
      .catch((error) => {
        console.log(error.message)
      })
    return datos
  } catch (error) {
    Promise.reject(error)
  }
}

export async function apiCallWithBody ({
  url,
  method = 'POST',
  body = JSON.stringify({}),
  headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Security-Policy': 'upgrade-insecure-requests'
  })
}) {
  try {
    const datos = await fetch(url, {
      method,
      body,
      headers,
      referrerPolicy: 'unsafe-url'
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        return false
      })
      .then((data) => data)
    return datos
  } catch (error) {
    Promise.reject(error)
  }
}
