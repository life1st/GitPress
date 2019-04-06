import React, {Component} from 'react'
import {markdown} from 'markdown'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import css from './index.scss'

class RenderFile extends Component {
  static defaultProps = {
    file: null
  }
  state = {
    text: ''
  }
  componentDidMount() {
    this.highlightText()
  }
  componentWillUpdate() {
    this.highlightText()
  }
  highlightText = () => {
    this.containorEl.querySelectorAll('pre code').forEach(block => {
      hljs.highlightBlock(block)
    })
  }
  render() {
    const {file, isAdmin} = this.props

    let content = <p />
    if (!!file) {
      const {path} = file
      const typeMap = {
        ['.md']: (file) => (
          <pre dangerouslySetInnerHTML={{__html:
            markdown.toHTML(file.content)
          }} />
        ),
        ['.js']: (file) => (
          <pre>
            <code className="js">
              {file.content}
            </code>
          </pre>
        ),
        ['.html']: (file) => (
          <pre>
            <code className="html">
              {file.content}
            </code>
          </pre>
        ),
        ['.png']: (file) => (
          <img src={file.content} alt=""/>
        )
      }

      const knownType = Object.keys(typeMap).find(type => path.includes(type))
      if (!!knownType) {
        content = typeMap[knownType](file)
      } else {
        const type = path.split('.').pop()
        content = (
          <pre>
            <code className={type}>
              {file.content}
            </code>
          </pre>
        )
      }
    }
    return (
      <div ref={ref => this.containorEl = ref}>
        <div className={css.opreations}>
          {
            isAdmin ? (
              <button>编辑</button>
            ) : (
              <button>关注</button>
            )
          }
          <button>收藏</button>
        </div>
        {content}
      </div>
    )
  }
}

export default RenderFile