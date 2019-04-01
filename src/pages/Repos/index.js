import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import css from './index.scss'
import {store, ACTION_TYPES} from '../../store/repos'

class Repos extends Component {
  state = {
    repos: []
  }
  
  componentDidMount() {
    const unsubscribe = store.subscribe(async () => {
      const state = await store.getState()

      console.log(store, state)
      this.setState(state)
    })
    store.dispatch({type: ACTION_TYPES.GET_REPO_LIST})
  }

  render() {
    const { repos } = this.state
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
    store.dispatch({type: ACTION_TYPES.GET_REPO_DETAIL, repo})
    this.props.history.push('/repo')
  }
}

export default withRouter(Repos)