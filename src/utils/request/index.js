import axios from 'axios'
import { API_BASE } from '../../../config'
import {isPrd} from '../../utils/env'

export function GET(url, config = {}) {
  if (!url.includes('http')) {
    url = `${API_BASE}${url}`
  }

  if (!isPrd) url += `?access_token=${window.localStorage.getItem('git_access_token')}`

  return axios.get(url, config)
}

function POST(url, data, config) {
  if (!url.includes('http')) {
    url = `${API_BASE}${url}`
  }

  return axios.post(url, data, config)
}

export function getAccessToken() {
  const url = 'https://github.com/login/oauth/access_token'

  return axios.get(url, {
    params: {
      client_id: '1fd37dbf8bbc4d6bff18',
      client_secret: '32828e0d61c494be7088d1f64a4b446951de0f77',
      code: sessionStorage.getItem('git_code')
    }
  })
}

export function getToken() {
  const url = '/authorizations'
  const data = {
    scopes: [
      'public_repo'
    ],
    note: 'admin script'
  }

  return POST(url, data)
}

export function getRepoList() {
  const url = '/user/repos'

  return GET(url)
}

export function getRefs(user, repo_name) {
  const url = `/repos/${user}/${repo_name}/git/refs`

  return GET(url)
}

export async function getRepo(user, repo_name) {
  const refs = await getRefs(user, repo_name)
  if (refs.status === 200) {
    const sha = refs.data[0].object.sha

    const url = `/repos/${user}/${repo_name}/git/trees/${sha}`

    return GET(url)
  } else {
    return Promise.reject('get sha error')
  }
}