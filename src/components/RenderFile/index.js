import React, {Component} from 'react'
import {Base64} from 'js-base64'
import {markdown} from 'markdown'
// import hljs from 'highlight.js'
import 'highlight.js/lib/index'
import 'highlight.js/styles/github.css'

class RenderFile extends Component {
  static defaultProps = {
    file: null
  }
  render() {
    const {file} = this.props
    let content = <p />
    if (!!file) {
      const {path} = file
      const typeMap = {
        ['.md']: (file) => (
          <pre dangerouslySetInnerHTML={{__html:
            markdown.toHTML(Base64.decode(file.content))
          }} />
        ),
        ['.js']: (file) => (
          <pre>
            <code className="js">
              {Base64.decode(file.content)}
            </code>
          </pre>
        ),
        ['.html']: (file) => (
          <pre>
            <code className="html">
              {Base64.decode(file.content)}
            </code>
          </pre>
        )
      }
      
      const knownType = Object.keys(typeMap).find(type => path.includes(type))
      console.log(knownType)
      if (!!knownType) {
        content = typeMap[knownType](file)
      } else {
        content = Base64.decode(file.content)
      }
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}

export default RenderFile