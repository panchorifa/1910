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
      userSelect: 'none',
    }
    const src = this.color === 'black' ? 'black-1910.png' : 'white-1910.png'
    return (
      <img src={src} alt='1910' style={style}/>
    )
  }
}

export default Logo
