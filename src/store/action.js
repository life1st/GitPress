import {getRepoList, getRepo} from '../utils/request';
import {getUser} from '../utils/request/user'
import {
  REPO_TYPES as TYPES,
  NET_TYPES,
  USER_TYPES,
  ARTICLE_TYPES
} from './actionTypes'
import {GET} from '../utils/request'
import { async } from 'q';
// todo: Quiz, 这到底是 action 还是 dispatch 呢
// 04.03 It's action. just return a func, and redux thunk will handle this on middleware, after finish, dispatch to redux.
export function getRepos() {
  return async dispatch => {
    const res = await getRepoList()

    const repos = res.data.map(({language, name, trees_url, owner}) => ({
      language, name, trees_url, owner
    }))

    dispatch({
      type: TYPES.GET_REPO_LIST,
      payload: {repos}
    })
  }
}

export function getRepoItem(username, reponame, branch) {
  return async dispatch => {
    const res = await getRepo(username, reponame, branch)
    if (res.status === 200) {
      const {data} = res
      dispatch({
        type: TYPES.GET_REPO_DETAIL,
        payload: data
      })
    } else {
      dispatch({
        type: NET_TYPES.FAILED
      })
    }
  }
}

export function getUserInfo() {
  return async dispatch => {
    const res = await getUser()
    if (res.status === 200) {
      const {data} = res
      dispatch({
        type: USER_TYPES.GET_LOGIN_INFO,
        payload: data
      })
    } else {
      dispatch({
        type: NET_TYPES.FAILED
      })
    }
  }
}


export function getSubFolderFiles(url, path) {
  return async dispatch => {
    const res = await GET(url)
    if (res.status === 200) {
      const {data} = res
      dispatch({
        type: ARTICLE_TYPES.FETCH_ARTICLE_LIST_SUCCESS,
        payload: {
          ...data.tree
          .map(item => ({...item, folder: path}))
          .reduce((counter, currentVal) => {
            counter[currentVal.sha] = currentVal
            return counter
          }, {})
        }
      })
    }
  }
}

export function filterCategory(folder) {
  return {
    type: ARTICLE_TYPES.CHANGE_CATEGORY,
    payload: folder
  }
}

export function getFile(url) {
  return async dispatch => {
    const res = await GET(url)
    if (res.status === 200) {
      const {data} = res
      dispatch({
        type: ARTICLE_TYPES.FETCH_ARTICLE,
        payload: data
      })
    }
  }
}