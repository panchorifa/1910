import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Languages from '../components/Languages'
import MediaQuery from 'react-responsive'

const styles = StyleSheet.create({
  section: {
    flexGrow:0,
    height: '2.5em',
    textAlign: 'center',
    position: 'relative',
    width: '100vw',
    margin: '0 auto',
  },
  languages: {
    position: 'absolute',
    right: '1em',
    top: '7px'
  },
  copyr: {
    margin: '0 auto',
    color: '#555',
    fontSize: '1.1em',
    lineHeight: '2.4em'
  },
})

class Footer extends Component {
  render() {
    return (
      <div className={css(styles.section)}>
        <div className={css(styles.copyr)}>
          &copy; 1910 Inc
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
