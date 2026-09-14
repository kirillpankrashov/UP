import axios from 'axios'

const CI_PROJECT_ID = 25058416
const API_TOKEN = process.env.GITLAB_PRIVATE_TOKEN || ''
const API_V4_URL = 'https://gitlab.com/api/v4'

const API_URL = `${API_V4_URL}/projects/${CI_PROJECT_ID}`

export default (path, method = 'GET', params) => {
	if (!API_TOKEN) {
		throw new Error('GITLAB_PRIVATE_TOKEN is not configured')
	}

	return axios(`${API_URL}/${path}`, {
		method,
		params,
		headers: { 'PRIVATE-TOKEN': API_TOKEN },
	})
}
