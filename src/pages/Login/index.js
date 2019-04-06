import React, {Component} from 'react'
import {connect} from 'react-redux'
import {str2Obj} from '../../utils/url'
import {getAccessToken} from '../../utils/request'
import {withRouter} from 'react-router-dom'
import {getUserInfo} from '../../store/action'

const url = 'https://github.com/login/oauth/authorize?client_id=1fd37dbf8bbc4d6bff18'

class Login extends Component {
  
  componentDidMount() {
    const search = window.location.search
    if (!search) {
      window.location.href = url
    } else {
      const {code} = str2Obj(search.slice(1))
      window.sessionStorage.setItem('git_code', code)
      getAccessToken().then(res => {
        const data = str2Obj(res.data)
        if (data.error) {
          // todo handle err.
        } else {
          window.localStorage.setItem('git_access_token', data.access_token)
        }
        this.props.getUserInfo()

        this.props.history.push('/')
      })
    }
  }

  render() {
    return (
      <div>
        Login...
      </div>
    )
  }
}

export default withRouter(connect(
  null,
  {
    getUserInfo
  }
)(Login))