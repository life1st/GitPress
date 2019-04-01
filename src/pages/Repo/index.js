import React, {Component} from 'react'
import {connect} from 'react-redux'

class Repo extends Component {
  render() {
    console.log(this.props.repo)
    const {repo} = this.props
    return (
      <div>
        <h2>Repo</h2>
        <h3>files:</h3>
        {
          repo.tree && (
            <ul>
              {
                repo.tree.map(file => (
                  <li key={file.path} onClick={() => this.handleItemClick(file)}> 
                    <span>{file.path}</span>
                  </li>
                ))
              }
            </ul>
          )
        }
      </div>
    )
  }

  handleItemClick = (file) => {
    
  }
}

const mapState2Props = (state) => {
  console.log(state)

  return ({
    repo: state.repoDetail
  })
}

export default connect(
  mapState2Props
)(Repo)