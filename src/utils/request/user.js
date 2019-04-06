import {GET} from './index'

export function getUser(username) {
  const url = username ? `/user/${username}` : '/user'

  return GET(url)
}