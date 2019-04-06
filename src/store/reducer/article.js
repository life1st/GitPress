import {ARTICLE_TYPES as TYPES} from '../actionTypes'
const initArticleState = {
  list: {},
  detail: {},
  selected_category: null
}

export default function article(state = initArticleState, action) {
  switch (action.type) {
    case TYPES.FETCH_ARTICLE_LIST_SUCCESS:
    /**
     * payload: {
     *    <article_sha>: <article>
     * } <article_list>
     * 
     */
      return {
        ...state,
        list: {
          ...state.list,
          ...action.payload
        }
      }
    case TYPES.CHANGE_CATEGORY:
      return {
        ...state,
        selected_category: action.payload
      }
    case TYPES.FETCH_ARTICLE:
      return {
        ...state,
        detail: action.payload
      }
    default: 
      return {...state}
  }
}