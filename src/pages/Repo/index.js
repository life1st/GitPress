import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRepoItem} from '../../store/action'
import { GET } from '../../utils/request'
// import RenderFile from '../../components/RenderFile'
import Editor from '../../components/Editor'

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
    file: null,
    isFetchingFile: false
  }
  componentDidMount() {
    const {state} = this.props.history.location
    if (state && state.repo) {
      this.props.getRepoItem(state.repo)
    }
    // const {sha} = this.props.history
    console.log(this.props)
  }
  componentWillReceiveProps(props) {
    this.setState({
      files: props.repo.tree
    })
  }

  render() {
    const {repo} = this.props
    const {files, file, isFetchingFile} = this.state
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
          isFetchingFile
          ? <div>Loading。。。</div>
          // : file && (<RenderFile file={file} />)
          : file && (<Editor file={file} />)
        }
      </div>
    )
  }

  fetchTree = (tree) => {
    GET(tree.url).then(res => {
      if (res.status === 200) {
        const data = res.data
        this.setState({
          files: data.tree
        })
      }
    })
  }

  fetchFile = (file) => {
    this.setState({
      isFetchingFile: true
    })
    GET(file.url).then(res => {
      if (res.status === 200) {
        const data = res.data
        this.setState({
          file: {
            ...data,
            ...file
          },
          isFetchingFile: false
        })
      }
    })
  }
  
  handleItemClick = (file) => {
    console.log(file)
    switch (file.type) {
      case 'tree':
        this.fetchTree(file)
        this.props.history.push(`/repo/${file.sha}`)
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