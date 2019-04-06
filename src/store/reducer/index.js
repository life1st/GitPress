import {combineReducers} from 'redux'
import repos from './repos'
import user from './user'
import article from './article'

export default combineReducers({
  repos,
  user,
  article
})