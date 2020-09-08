import Axios from 'axios'

export function useAxios() {
  const apiClient = Axios.create({
    baseURL: 'https://demo.vnda.com.br',
    headers: {
      Authorization: `Token ${process.env.token}`
    }
  })

  function errorHandler(err) {
    throw new Error(JSON.stringify(err))
  }

  return { apiClient, errorHandler }
}
