import {createStore} from 'redux'
import {getRepoList, getRepo} from '../utils/request';

const initReposState = {
  repos: []
}
const TYPES = {
  GET_REPO_LIST: 'repos/get_repo_list',
  GET_REPO_DETAIL: 'repos/get_repo_detail'
}
function repos(state = initReposState, action) {
  switch (action.type) {
    case TYPES.GET_REPO_LIST:
      return getRepos(state)
    case TYPES.GET_REPO_DETAIL:
      return getRepoItem(state, action.repo)
  }
}

async function getRepos(state) {
  const res = await getRepoList()
  console.log(res)
  state.repos = res.data.map(({language, name, trees_url}) => ({
    language, name, trees_url
  }))

  return state
}

async function getRepoItem(state, repo) {
  console.log(repo)
  const res = await getRepo(repo.trees_url.replace('{/sha}', ''))

  console.log(repo, res)
}

export const store = createStore(repos)
export const ACTION_TYPES = TYPES