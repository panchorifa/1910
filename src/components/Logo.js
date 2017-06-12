import React, { Component } from 'react'
import { connect } from 'react-redux'

class Logo extends Component {
  constructor({height, color}){
    super()
    this.height = height
    this.color = color || '#fff'
  }
  render() {
    const style = {
      height: this.height + 'em',
      color: this.color,
      userSelect: 'none'
    }
    return (
      <img src="white-1910.png" alt='1910' style={style}/>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    menu: store.menu
  }
}

export default connect(mapStateToProps)(Logo)
