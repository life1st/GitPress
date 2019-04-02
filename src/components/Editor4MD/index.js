import React, {Component} from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

class Editor4MD extends Component {
  static defaultProps = {
    file: null
  }
  componentDidMount() {

  }
  render() {
    const {file} = this.props
    const value = file.content
    return (
      <div>
        <SimpleMDE 
          value={value}
          onChange={this.handleChange}
        />
      </div>
    )
  }

  handleChange = (e) => {
    console.log(e)
  }
}

export default Editor4MD