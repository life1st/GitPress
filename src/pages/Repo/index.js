import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRepoItem} from '../../store/action'
import { GET } from '../../utils/request'
import RenderFile from '../../components/RenderFile'

const renderTree = ({files, handleItemClick}) => (
  <ul>
    {
      files.map(file => (
        <li key={file.path} onClick={() => handleItemClick(file)}>
          <span>{file.path}</span>
        </li>
      ))
    }
  </ul>
)

class Repo extends Component {
  state = {
    files: [],
    file: null
  }
  componentDidMount() {
    const {repo} = this.props.history.location.state
    this.props.getRepoItem(repo)
  }
  componentWillReceiveProps(props) {
    this.setState({
      files: props.repo.tree
    })
  }

  render() {
    const {repo} = this.props
    const {files, file} = this.state
    return (
      <div>
        <h2>Repo</h2>
        <h3>files:</h3>
        {
          repo.tree && (
            <ul>
              {
                files.map(file => (
                  <li key={file.path} onClick={() => this.handleItemClick(file)}> 
                    <span>{file.path}</span>
                  </li>
                ))
              }
            </ul>
          )
        }

        <h3>file</h3>
        {
          file && (
            <RenderFile file={file} />
          )
        }
      </div>
    )
  }

  fetchTree = (tree) => {
    GET(tree.url).then(res => {
      if (res.status === 200) {
        const data = res.data
        console.log(data)
      }
    })
  }

  fetchFile = (file) => {
    GET(file.url).then(res => {
      if (res.status === 200) {
        const data = res.data
        console.log(data)
        this.setState({
          file: data
        })
      }
    })
  }
  
  handleItemClick = (file) => {
    console.log(file)
    switch (file.type) {
      case 'tree':
        this.fetchTree(file)
        break
      case 'blob':
        this.fetchFile(file)
        break
    }
  }
}

const mapState2Props = (state) => {
  return ({
    repo: state.repoDetail
  })
}

export default connect(
  mapState2Props, 
  {
    getRepoItem
  }
)(Repo)