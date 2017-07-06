
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import MediaQuery from 'react-responsive'
import {store} from '../store'
import {StyleSheet, css} from 'aphrodite'
import Header from './Header'
import Footer from './Footer'
import DownArrow from '../components/DownArrow'
import {loadApp, isMobile} from '../libs/services'
import Waypoint from 'react-waypoint'
import Scroll from 'react-scroll'

const Element = Scroll.Element

const styles = StyleSheet.create({
  layout: {
    overflow: 'hidden',
    height: '100vh',
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch'
  },
  section: {
    flexGrow: 1,
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
  	backgroundColor: "#000",
  },
  content: {
    flexGrow: 1,
    overflowY: 'auto',
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
    margin: 0, padding: 0,
  },
  waypoint1: {
    position: 'absolute',
    top: '22%',
  },
  waypoint2: {
    position: 'absolute',
    top: '34%',
  },
})


class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = { width: '0', height: '0', scrolled: false};
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    window.addEventListener('orientationchange', this.doOnOrientationChange.bind(this))
  }

  doOnOrientationChange() {
    window.location.reload()
  }

  componentWillUnmount() {
    if(!isMobile()) {
      window.removeEventListener('resize', this.updateWindowDimensions)
    }
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  async componentDidMount() {
    loadApp()
    this.updateWindowDimensions();
    if(!isMobile()) {
      window.addEventListener('resize', this.updateWindowDimensions)
    }
  }

  scrolledBeforeLogo(value) {
    store.dispatch({type: 'SET_SCROLLED_BEFORE_LOGO', scrolled: value})
  }

  scrolledAfterLogo(value) {
    store.dispatch({type: 'SET_SCROLLED_AFTER_LOGO', scrolled: value})
  }

  scrolled(value) {
    this.setState({scrolled: value})
  }

  render() {
    const scrolled = this.state.scrolled
    const home = this.props.section < 0
    const burger = this.props.burger
    const height = isMobile() ? this.state.height+'px' : '100%'
    return (
      <div className={css(styles.layout)}>
        <div style={ {height: height} } className={css(styles.section)}>

          <MediaQuery query='(max-device-width: 515px)'>
            <div><Waypoint onEnter={this.scrolled.bind(this, false)} onLeave={this.scrolled.bind(this, true)}/></div>
            <div className={css(styles.waypoint1)}><Waypoint onEnter={this.scrolledBeforeLogo.bind(this, false)} onLeave={this.scrolledBeforeLogo.bind(this, true)}/></div>
            <div className={css(styles.waypoint2)}><Waypoint onEnter={this.scrolledAfterLogo.bind(this, false)} onLeave={this.scrolledAfterLogo.bind(this, true)}/></div>
          </MediaQuery>

          <div style={{flexGrow: 0}}><Header/></div>
          <div style={{backgroundColor: home ? '#000' : '#fff'}}
            className={css(styles.content)}>
            <Element name="home"></Element>
            {this.props.children}
          </div>

          <MediaQuery query='(min-device-width: 516px)'>
            <div style={{flexGrow: 0}}><Footer/></div>
          </MediaQuery>

          <MediaQuery query='(max-device-width: 515px)'>
            <div style={{flexGrow: 0, height: '5em',
              maxHeight: '5em', minHeight: '5em', textAlign: 'center'}}>
              { !burger && !scrolled && <DownArrow/> }
            </div>
          </MediaQuery>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    section: store.section,
    burger: store.burger
  }
}
export default withRouter(connect(mapStateToProps)(Layout))
