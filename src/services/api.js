import axios from 'axios'

const api = axios.create({
	baseURL: '/'
})

api.interceptors.response.use(
	(res) => res,
	(error) => error
)

export default api;