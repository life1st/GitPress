import React, {Component} from 'react'

class RenderFile extends Component {
  static defaultProps = {
    file: null
  }
  render() {
    const {file} = this.props
    return (
      <div>
        {
          file && window.decodeURIComponent(window.atob(file.content)) 
        }
      </div>
    )
  }
}

export default RenderFile