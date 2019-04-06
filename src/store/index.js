import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import {isDev} from '../utils/env'

const composeEnhancers = isDev ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(
    thunk
  )
))
export default store 