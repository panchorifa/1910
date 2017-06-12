import React, {Component} from 'react'
import { connect } from 'react-redux'
import {msg} from '../libs/services'
import {color1} from '../libs/colors'


class Label extends Component {
  constructor({id, style}) {
    super()
    this.id = id
    this.style = style || {}
  }

  render() {
    let text = msg(this.props.lang, this.id)
    return (
      <div style={{color: color1, display: 'inline-block'}}>
      { text && text['__html']
        ? <span style={this.style} dangerouslySetInnerHTML={text}/>
        : <span style={this.style}>{text}</span>
      }
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    lang: store.lang
  }
}

export default connect(mapStateToProps)(Label)
