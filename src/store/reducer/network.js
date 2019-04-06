const initNetState = {
  network: null
}

export default function networkReducer(state = initNetState, action) {
  if (action.type) {
    return {
      network: action.type
    }
  } else {
    return {
      ...state
    }
  }
}