import React,{Component} from 'react'
import {connect} from 'react-redux'
import {
  getRepoItem,
  filterCategory
} from '../../store/action'
import {BLOG_CONFIG} from '../../../config'
import css from './index.scss'

class Categories extends Component {
  static defaultProps = {
    repo: {}
  }
  componentWillMount() {
    const {repo} = this.props
    if (Object.keys(repo).length === 0) {
      const {username, reponame, branch} = BLOG_CONFIG
      if (username && reponame) {
        this.props.getRepoItem(username, reponame, branch)
      }
    }
  }
  render() {
    const {repo, selected_category} = this.props
    const tree = repo.tree && repo.tree.filter(item => item.type === 'tree')
    return (
      <ul className={css.categories}>
        {
          tree ? 
          tree.map(folder => (
            <li key={folder.path} 
              className={`${css.item} ${selected_category === folder.path && css.selected}`} 
              onClick={() => {this.handleItemClick(folder)}}>
              {folder.path}
            </li>
          )) :
          (
            <li>fetching categories~~~</li>
          )
        }
      </ul>
    )
  }

  handleItemClick = ({path}) => {
    if (path === this.props.selected_category) {
      path = null
    }
    this.props.filterCategory(path)
  }
}

const mapState2Props = ({repos, article}) => ({
  repo: repos.detail,
  selected_category: article.selected_category
})
export default connect(
  mapState2Props,
  {
    getRepoItem,
    filterCategory
  }
)(Categories)