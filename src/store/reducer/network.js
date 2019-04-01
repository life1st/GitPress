import {NET_TYPES} from '../action'
const initNetState = {
  network: null
}

export default networkReducer(state = initNetState, action) {
  switch (action.type) {
    case NET_TYPES.FAILED:
      return { network: }
  }
}