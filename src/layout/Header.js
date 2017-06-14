import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import MediaQuery from 'react-responsive'
import { store } from '../store'
import { StyleSheet, css } from 'aphrodite'
import Logo from '../components/Logo'
import Menu from '../components/Menu'
import BurgerMenu from './BurgerMenu'
import {color2, color4} from '../libs/colors'
import {upToSmall} from '../libs/media'

const styles = StyleSheet.create({
  component: {
    flexGrow: 0,
    height: '3em',
    display: 'flex', flexFlow: 'row', justifyContent: 'space-between',
    backgroundColor: '#000',
    [upToSmall]: {
      position: 'fixed',
      width: '100%',
      zIndex: 2000,
    }
  },
  nav: {
    width: '100%',
    display: 'flex', flexFlow: 'row', justifyContent: 'space-between',
    overflow: 'hidden',
  },
  menu: {
    padding:'.25em 0',
  },
  burger: {
    height: '3.5em',
    width: '100vw',
    backgroundColor: '#000',
    display: 'flex', flexFlow: 'row', justifyContent: 'space-between',
  }
})

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      toggle: true
    }
  }
  handleClick() {
    store.dispatch({type:'SET_SECTION', section: -1})
  }

  toggleBurger() {
    store.dispatch({type: 'SET_BURGER', burger: true})
  }

  render() {
    const home = this.props.section < 0
    const scrolled1 = this.props.scrolled1
    const scrolled2 = this.props.scrolled2
    return (
      <div className={css(styles.component)}>
        <MediaQuery query='(min-device-width: 516px)'>
          <div className={css(styles.nav)}>
            <div style={{padding: '.75em .5em'}}>
              { !home &&
                <div style={{cursor: 'pointer', padding: '.1em 0 0 .1em'}}
                    onClick={this.handleClick.bind(this)}>
                  <Logo height={2}/>
                </div>
              }
            </div>
            <div className={css(styles.menu)}><Menu/></div>
          </div>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 515px)'>
        <div className={css(styles.burger)} style={
            {borderBottom: scrolled1 ? '1px solid #fff' : 'none'}}>
          <div style={{padding: '1em .75em'}}>
            {scrolled2 && <Logo height={2}/>}
          </div>
          <div onClick={this.toggleBurger.bind(this)} style={{height: '4em', padding: '.75em'}}>
            <FontAwesome name="navicon" size='2x' style={{color: '#fff'}}/>
          </div>
        </div>
        { this.props.burger && <BurgerMenu/> }
        </MediaQuery>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    burger: store.burger,
    section: store.section,
    scrolled1: store.scrolledBeforeLogo,
    scrolled2: store.scrolledAfterLogo
  }
}

export default connect(mapStateToProps)(Header)
