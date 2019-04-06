import React from 'react'
import ReactDOM from 'react-dom'
import Pages from './routers'
import {Provider} from 'react-redux'
import store from './store'

ReactDOM.render(
<Provider store={store}>
  <Pages />
</Provider>,
document.getElementById('root'))