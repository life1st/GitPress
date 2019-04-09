import React, {Component} from 'react'

class Loading extends Component {
  static defaultProps = {
    isCircle: false,
    width: 0,
    height: 0
  }
  render() {
    return (
      <div>
        <i></i>
      </div>
    )
  }
}