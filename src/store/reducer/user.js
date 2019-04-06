import {USER_TYPES as TYPES} from '../actionTypes'
const initUserState = {

}

export default function user(state = initUserState, action) {
  switch (action.type) {
    case TYPES.GET_LOGIN_INFO:
      return {
        ...state,
        ...action.payload
      }
    default: 
      return {
        ...state
      }
  }
}
