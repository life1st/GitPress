import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRepoItem} from '../../store/action'
import {GET} from '../../utils/request'
import {Base64} from 'js-base64'
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
    file: null,
    isFetchingFile: false
  }
  
  async componentWillMount() {
    if (Object.keys(this.props.repo).length === 0) {
      // 刷新后的数据恢复
      const {username, reponame} = this.props.match.params
      await this.props.getRepoItem(username, reponame)
    }
    // const {sha} = this.props.history
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
          : file && (<RenderFile file={file} />)
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
            ...file,
            content: Base64.decode(data.content)
          },
          isFetchingFile: false
        })
      }
    })
  }
  
  handleItemClick = (file) => {
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

const mapState2Props = ({repos}) => {
  return ({
    repo: repos.detail
  })
}

export default connect(
  mapState2Props, 
  {
    getRepoItem
  }
)(Repo)