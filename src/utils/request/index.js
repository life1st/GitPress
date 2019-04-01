import axios from 'axios'
import { API_BASE } from '../../../config'
import {isPrd} from '../../utils/env'

function GET(url, config = {}) {
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

export function getRefs() {

}

export function getRepo(url) {
  return GET('https://api.github.com/repos/life1st/Air-Matters-web/downloads')
}