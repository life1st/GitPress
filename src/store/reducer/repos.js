import {REPO_TYPES as TYPES} from '../actionTypes'

const initReposState = {
  list: [],
  detail: {}
}

export default function repos(state = initReposState, action) {
  switch (action.type) {
    case TYPES.GET_REPO_LIST:
      return {
        ...state,
        list: action.payload.repos
      }
    case TYPES.GET_REPO_DETAIL:
      return {
        ...state,
        detail: action.payload
      }
    default:
      return state
  }
}