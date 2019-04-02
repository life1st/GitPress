import React, {Component} from 'react'
import {Base64} from 'js-base64'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main'
import css from './index.scss'

class Editor extends Component {
  static defaultProps = {
    file: null
  }
  componentDidMount() {
    const {file} = this.props
    let content = '<p></p>'
    let type = ''
    if (file) {
      type = file.path.split('.').pop()
      content = Base64.decode(file.content)
    }
    monaco.editor.create(
      this.el,
      {
        value: content,
        language: type
      }
    )
  }
  render() {
    return (
      <div className={css.editorWrap}>
        <div 
          className={css.editorContainor}
          ref={ref => this.el = ref} />
      </div>
    )
  }
}

export default Editor