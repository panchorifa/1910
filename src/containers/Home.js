import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Logo from '../components/Logo'
import Typer from '../components/Typer'
import Languages from '../components/Languages'
import {msg} from '../libs/services'
import MediaQuery from 'react-responsive'
import {color2} from '../libs/colors'
import {upToSmall} from '../libs/media'


const styles = StyleSheet.create({
  section :{
    flexGrow: 1,
    display: 'flex', flexFlow: 'column', justifyContent: 'center',
    textAlign: 'center',
  },
  logo: {
    margin: '10em auto',
    [upToSmall]: {
      margin: '0 auto',
    }
  },
  languages: {
    marginTop: '2em',
    display: 'flex', flexFlow: 'row', justifyContent: 'center'
  }
})

class Home extends Component {
  render() {
    const lang = this.props.lang
    const typer = msg(this.props.lang, 'home.typer')
    const active = this.props.section < 0
    return active && <div className={css(styles.section)}>
        <div className={css(styles.logo)}>
          <MediaQuery query='(min-device-width: 516px)'>
            <Logo height={9}/>
          </MediaQuery>
          <MediaQuery query='(max-device-width: 515px)'>
            <Logo height={6}/>
          </MediaQuery>
        </div>

        <MediaQuery query='(max-device-width: 515px)'>
          <div className={css(styles.languages)}><Languages name={true}/></div>
        </MediaQuery>
      </div>
  }
}

const mapStateToProps = (store) => {
  return {
    section: store.section,
    lang: store.lang
  }
}

export default connect(mapStateToProps)(Home)
