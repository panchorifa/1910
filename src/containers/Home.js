import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Logo from '../components/Logo'
import Languages from '../components/Languages'
import MediaQuery from 'react-responsive'
import {atLeastSmall, atLeastMediumBig} from '../libs/media'


const styles = StyleSheet.create({
  section :{
    flexGrow: 1,
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
    textAlign: 'center',
  },
  logo: {
    margin: '0 auto',
    flexGrow: 1,
    display: 'flex', flexFlow: 'column', justifyContent: 'center',
    [atLeastSmall]: {
      marginTop: '-6em',
      '@media screen and (orientation:landscape) and (max-height: 515px)': {
        marginTop: 0
      }
    },
    [atLeastMediumBig]: {
      marginTop: '-12em',
    },
    '@media screen and (orientation:landscape) and (max-height: 768px)': {
      marginTop: '-3em',
      // border: '1px solid blue'
    },
    '@media only screen and (max-device-width : 736px)  and (orientation : landscape)': {
      marginTop: 0,
      // border: '1px solid red'
    },
  },
  languages: {
    marginTop: '1.5em',
    display: 'flex', flexFlow: 'row', justifyContent: 'center'
  }
})

class Home extends Component {
  render() {
    const active = this.props.section < 0
    return active && <div className={css(styles.section)}>
        <div className={css(styles.logo)}>
          <MediaQuery query='(min-device-width: 516px)'>
            <div className={css(styles.blogo)}>
              <Logo height={9}/>
              <div style={{color: '#fff', marginTop: '-1.5em',
                fontSize: '1.35em',
                letterSpacing: '8px',
                marginLeft: '7.4em'}}>
                Software
              </div>
            </div>
          </MediaQuery>
          <MediaQuery query='(max-device-width: 515px)'>
            <Logo height={6}/>
            <div style={{color: '#fff', marginTop: '-1.5em',
              letterSpacing: '5.35px',
              marginLeft: '6.85em'}}>
              Software
            </div>
            <div className={css(styles.languages)}><Languages name={true}/></div>
          </MediaQuery>
        </div>
      </div>
  }
}

const mapStateToProps = (store) => {
  return {
    section: store.section
  }
}

export default connect(mapStateToProps)(Home)
