import {combineReducers} from 'redux'
import repos from './repos'
import user from './user'
import article from './article'
import network from './network';

export default combineReducers({
  repos,
  user,
  article,
  network
})