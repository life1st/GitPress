import {getRepoList, getRepo, getRefs} from '../utils/request';

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

export function getRepoItem(repo) {
  return async dispatch => {
    const res = await getRepo(repo.owner.login, repo.name)
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

const TYPES = {
  GET_REPO_LIST: 'repos/get_repo_list',
  GET_REPO_DETAIL: 'repos/get_repo_detail'
}

export const NET_TYPES = {
  FETCHING: 'net/fetching',
  SUCCESS: 'net/success',
  FAILED: 'net/failed'
}

export const ACTION_TYPES = TYPES