import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getUserInfo} from '../../store/action'
import css from './index.scss'

class User extends Component {
  async componentWillMount() {
    const {user} = this.props
    if (Object.keys(user).length === 0) {
      await this.props.getUserInfo()
    }
  }

  render() {
    const {
      avatar_url, login, bio
    } =  this.props.user

    return (
      <div className={css.userContainor}>
        <img src={avatar_url} alt="user avatar" className={css.avatar}/>
        <div className={css.text}>
          <p>{login}</p>
          <p>{bio}</p>
        </div>
      </div>
    )
  }
}

const mapState2Props = ({user}) => ({
  user
})

export default connect(
  mapState2Props, 
  {
    getUserInfo
  }
)(User)