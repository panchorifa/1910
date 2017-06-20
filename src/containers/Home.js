import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Logo from '../components/Logo'
import Typer from '../components/Typer'
import Languages from '../components/Languages'
import {msg} from '../libs/services'
import MediaQuery from 'react-responsive'
import {color2} from '../libs/colors'
import {upToSmall, upToMedium, upToSkinny,
        atLeastMediumBig,
        atLeastBig,
        ipad, ipadPortrait,
        upToMediumBig, upToBig} from '../libs/media'


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
            <div className={css(styles.blogo)}>
              <Logo height={9}/>
            </div>
          </MediaQuery>
          <MediaQuery query='(max-device-width: 515px)'>
            <Logo height={6}/>
            <div className={css(styles.languages)}><Languages name={true}/></div>
          </MediaQuery>
        </div>
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
