import React, { Component } from 'react'
import { connect } from 'react-redux'
import { store } from '../store'
import { StyleSheet, css } from 'aphrodite'
import {msg} from '../libs/services'
import {color2} from '../libs/colors'

const styles = StyleSheet.create({
  link: {
    lineHeight: '1em',
    marginRight: '1em',
    cursor: 'pointer',
    userSelect: 'none'
  }
})

class MenuLink extends Component {
  constructor({name, index}) {
    super()
    this.name = name
    this.index = index
    this.state = {hover: false}
  }

  handleClick() {
    store.dispatch({type: 'SET_SECTION', section: this.index})
  }

  handleHoverOn() {
    this.setState({hover: true})
  }

  handleHoverOff() {
    this.setState({hover: false})
  }

  render() {
    let name = msg(this.props.lang, "home."+this.name+'.name')
    let border = `4px solid ${color2}`
    let selected = this.props.section === this.index
    let color = this.state.hover
              ? '#ddd'
              : selected ? '#fff' : '#888'
    return(
      <div style={{color: color, borderBottom: selected ? border : 'none'}}
          onMouseEnter={this.handleHoverOn.bind(this)}
          onMouseLeave={this.handleHoverOff.bind(this)}
          onClick={this.handleClick.bind(this)}
       className={css(styles.link)}>{name}</div>
    )
  }
}

const mapStateToProps = (store) => {
    return {
      section: store.section,
      lang: store.lang
    }
}

export default connect(mapStateToProps)(MenuLink)
