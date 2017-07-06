import React, { Component } from 'react';
import { connect } from 'react-redux'
import {store} from '../store'
import { StyleSheet, css } from 'aphrodite'
import MainLogo from '../components/MainLogo'
import Languages from '../components/Languages'
import MediaQuery from 'react-responsive'
import {isMobile} from '../libs/services'

const styles = StyleSheet.create({
  section :{
    flexGrow: 1,
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
    textAlign: 'center',
    backgroundColor: '#000',
    overflow: 'hidden'
  },
  logo: {
    width: '400px',
    margin: '8vh auto'
  },
  languages: {
    marginTop: '1.5em',
    display: 'flex', flexFlow: 'row', justifyContent: 'center'
  }
})

class Home extends Component {
  componentDidMount() {
    store.dispatch({type: 'SET_SECTION', section: -1})
    if(!isMobile()) {
      const script = document.createElement("script");
      script.src = "/ball.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }

  render() {
    return (
      <div>
      <MediaQuery query='(max-device-width: 515px)'>
        <div className={css(styles.logo)}>
          <MainLogo height={7}/>
          <div className={css(styles.languages)}><Languages name={true}/></div>
        </div>
      </MediaQuery>
      <MediaQuery query='(min-device-width: 516px)'>
        <div id="playarea" className={css(styles.section)}>
        </div>
      </MediaQuery>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    section: store.section
  }
}

export default connect(mapStateToProps)(Home)
// <div className={css(styles.logo)}>
// <MediaQuery query='(max-device-width: 515px)'>
//   <MainLogo height={7}/>
//   <div className={css(styles.languages)}><Languages name={true}/></div>
// </MediaQuery>
// <MediaQuery query='(min-device-width: 516px)'>
//   <div className={css(styles.logo)}>
//     <MainLogo height={9}/>
//   </div>
// </MediaQuery>
// </div>
