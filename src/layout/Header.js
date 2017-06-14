import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import MediaQuery from 'react-responsive'
import { store } from '../store'
import { StyleSheet, css } from 'aphrodite'
import Logo from '../components/Logo'
import Menu from '../components/Menu'
import {color4} from '../libs/colors'
import {upToSmall} from '../libs/media'

const styles = StyleSheet.create({
  component: {
    flexGrow: 0,
    height: '4em',
    display: 'flex', flexFlow: 'row', justifyContent: 'space-between',
    [upToSmall]: {
      position: 'fixed',
      width: '100%',
      zIndex: 2000,
      backgroundColor: '#000'
    }
  },
  menu: {
    padding:'.25em 0',
  },
  burger: {
    width: '100vw',
    display: 'flex', flexFlow: 'row', justifyContent: 'space-between',
  }
})

class Header extends Component {
  handleClick() {
    store.dispatch({type:'SET_SECTION', section: -1})
  }

  render() {
    const home = this.props.section < 0
    const scrolled1 = this.props.scrolled1
    const scrolled2 = this.props.scrolled2
    return (
      <div className={css(styles.component)}>
        <MediaQuery query='(min-device-width: 516px)'>
        <div style={{padding: '.75em .5em'}}>
          { !home && <div style={{cursor: 'pointer', padding: '.1em 0 0 .1em'}}
                onClick={this.handleClick.bind(this)}>
              <Logo height={2}/>
            </div> }
        </div>
        <div className={css(styles.menu)}><Menu/></div>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 515px)'>
        <div className={css(styles.burger)} style={
            {borderBottom: scrolled1 ? '1px solid #fff' : 'none'}}>
          <div style={{padding: '1em'}}>
            {scrolled2 && <Logo height={2}/>}
          </div>
          <div style={{height: '4em', padding: '1em'}}>
            <FontAwesome name="navicon" size='2x' style={{color: '#fff'}}/>
          </div>
        </div>
        </MediaQuery>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    section: store.section,
    scrolled1: store.scrolledBeforeLogo,
    scrolled2: store.scrolledAfterLogo
  }
}

export default connect(mapStateToProps)(Header)
