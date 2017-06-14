import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Logo from '../components/Logo'
import Languages from '../components/Languages'
import {color4} from '../libs/colors'
import MediaQuery from 'react-responsive'

const styles = StyleSheet.create({
  section: {
    flexGrow:0,
    height: '2.5em',
    textAlign: 'center',
    position: 'relative',
    width: '100vw',
    // maxWidth: '960px',
    margin: '0 auto',
    // border: '1px solid red'
  },
  languages: {
    position: 'absolute',
    right: '1em',
    top: '7px'
  },
  copyr: {
    display: 'flex', flexFlow: 'row', justifyContent: 'center',
    width: '7em',
    margin: '0 auto',
    color: '#fff'
  },
  logo: {
    paddingTop: '6px'
  },
  reg: {
    color: '#555',
    fontSize: '1.4em',
    verticalAlign: 'bottom',
    margin: '4px 0 0 4px',
  },
  year: {
    padding: '6px 0 0 5px'
  }
})

class Footer extends Component {
  render() {
    return (
      <div className={css(styles.section)}>
        <div className={css(styles.copyr)}>
          <div className={css(styles.logo)}><Logo height={1.2}/></div>
          <div className={css(styles.reg)}>&reg;</div>
          <div className={css(styles.year)}>2017</div>
        </div>
        <MediaQuery query='(min-device-width: 516px)'>
          <div className={css(styles.languages)}><Languages/></div>
        </MediaQuery>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    section: store.section
  }
}

export default connect(mapStateToProps)(Footer)
