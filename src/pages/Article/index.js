import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import css from './index.scss'
import {Base64} from 'js-base64'
import markdown from 'markdown'

class Article extends Component {
  componentDidMount() {
  }
  render() {
    const {article}= this.props
    const content = article.content
    ? markdown.parse(Base64.decode(content))
    : ''
    console.log(article.content && Base64.decode(article.content))
    return (
      <div className={css.article}>
        <div 
          className={css.content}
          dangerouslySetInnerHTML={{__html: content}}
        />
      </div>
    )
  }
}

const mapState2Props = ({article}) => ({
  article: article.detail
})

export default withRouter(
  connect(
    mapState2Props
  )(Article)
)