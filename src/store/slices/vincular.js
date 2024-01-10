// tipe 1 para clientes y tipo 2 para super usuarios

try {
  const res = await apiCallWithBody({
    url: `${BASE_URL_API}/AltaUserGraf?type=1`,
    body: JSON.stringify({
      name: data.fullName,
      email: data.email,
      login: data.email,
      password: data.password,
      OrgId: 1
    })
  })
  if (res) {
    await getUsers(data?.clientId)()
  }
} catch (error) {
  dispatch(slice.actions.hasError(new Error(`Error al intenar agregar el usuario en Tangerine Metrics (${error.message})`)))
  dispatch(slice.actions.setLoader(false))
  dispatch(slice.actions.setSuccess(false))
  // await deleteUser()
}
