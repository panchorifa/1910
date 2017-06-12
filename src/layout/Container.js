import React, {Component} from 'react'
import './Container.css'

export default class Container extends Component {

  render() {
    const style = Object.assign(
      {
        padding: 0,
        margin: '0 auto',
      },
      this.props.style || {}
    )

    return (
      <div className="xcontainer" style={style}>
        {this.props.children}
      </div>
    )
  }
}
