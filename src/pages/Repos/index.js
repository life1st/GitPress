import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getRepos, getRepoItem} from '../../store/action'
import css from './index.scss'

class Repos extends Component {
  componentDidMount() {
    this.props.getRepos()
  }

  render() {
    const { repos } = this.props
    return (
      <div>
        <h2>Repos:</h2>
        <ul>
          {
            repos.map(repo => (
              <li key={repo.name} className={css.repoItem}>
                <span className={repo.language ? css.langTag : css.noTypeTag}>{repo.language || 'No type'}</span>
                <span onClick={() => this.handleRepoClick(repo)}>{repo.name}</span>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
  handleRepoClick = (repo) => {
    this.props.getRepoItem(repo)
    this.props.history.push('/repo')
  }

}

const mapState2Props = ({repos}) => ({
  repos
})
export default withRouter(
  connect(
    mapState2Props, 
    {
      getRepos, 
      getRepoItem
    }
  )(Repos)
)