import React, { Component } from 'react'
import { connect } from 'react-redux'
import { store } from '../store'
import { StyleSheet, css } from 'aphrodite'
import Logo from '../components/Logo'
import Menu from '../components/Menu'
import {color4} from '../libs/colors'

const styles = StyleSheet.create({
  component: {
    flexGrow: 0,
    height: '3em',
    display: 'flex', flexFlow: 'row', justifyContent: 'space-between'
  }
})

class Header extends Component {
  handleClick() {
    store.dispatch({type:'SET_SECTION', section: -1})
  }

  render() {
    let home = this.props.section < 0
    let style = {
      borderBottom: home
          ? 'none'
          : '3px solid ' + color4
    }
    return (
      <div style={style} className={css(styles.component)}>
        <div style={{padding: '.75em .5em'}}>
          { !home && <div style={{cursor: 'pointer', padding: '.1em 0 0 .1em'}} 
                onClick={this.handleClick.bind(this)}>
              <Logo height={2}/>
            </div> }
        </div>
        <div style={{padding:'.25em 0'}}><Menu/></div>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    section: store.section
  }
}

export default connect(mapStateToProps)(Header)
