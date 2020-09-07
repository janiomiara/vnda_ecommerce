import Axios from 'axios'

export function useAxios() {
  const apiClient = Axios.create({
    baseURL: 'https://demo.vnda.com.br',
    headers: {
      Authorization: 'Token token="87DN8452c5mtnhwxZT2QJXAa"'
    }
  })

  function errorHandler(err) {
    throw new Error(JSON.stringify(err))
  }

  return { apiClient, errorHandler }
}
