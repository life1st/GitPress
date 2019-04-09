import React, {Component} from 'react'
import {connect} from 'react-redux'
import User from '../../components/User'
import Categories from '../../components/Categories'
import Calender from '../../components/Calender'
import {getSubFolderFiles, getFile} from '../../store/action'

class Home extends Component {
  componentWillMount() {
    
  }
  componentWillReceiveProps(nextProps) {
    const {repo, article} = nextProps
    if (Object.keys(repo).length > 0 
    && Object.keys(article.list).length === 0) {
      const tree = repo.tree.filter(item => item.type === 'tree')
      tree.forEach(item => {
        this.props.getSubFolderFiles(item.url, item.path)
      })
    }
  }

  render() {
    const {article} = this.props
    const {list, selected_category} = article
    const articleList = Object.keys(list)
    .map(key => list[key])
    .filter(item => selected_category ? item.folder === selected_category : true)
    
    return (
      <div>
        <User />
        <Categories />
        <Calender />
        <ul>
        {
          articleList.map(item => (
            <li 
              key={item.path}
              onClick={() => {this.handleItemClick(item)}}
            >
              {item.path}
            </li>
          ))
        }
        </ul>
      </div>
    )
  }

  handleItemClick = (item) => {
    this.props.getFile(item.url)
    this.props.history.push('/article')
  }
}

const mapState2Props = ({repos, article}) => ({
  repo: repos.detail, 
  article
})
export default connect(
  mapState2Props, {
    getSubFolderFiles,
    getFile
  }
)(Home)