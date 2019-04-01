import {ACTION_TYPES as TYPES} from '../action'

const initReposState = {
  repos: [],
  repoDetail: {}
}

export default function repos(state = initReposState, action) {
  switch (action.type) {
    case TYPES.GET_REPO_LIST:
      return {
        ...state,
        repos: action.payload.repos
      }
    case TYPES.GET_REPO_DETAIL:
      return {
        ...state,
        repoDetail: action.payload
      }
    default:
      return state
  }
}