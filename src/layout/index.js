import React, {Component} from 'react'
import {Glyphicon} from 'react-bootstrap'
import MediaQuery from 'react-responsive'
import {store} from '../store'
import {StyleSheet, css} from 'aphrodite'
import Header from './Header'
import Footer from './Footer'
import DownArrow from '../components/DownArrow'
import {loadApp} from '../libs/services'
import Inspiration from '../containers/Inspiration'
import About from '../containers/About'
import Ideas from '../containers/Ideas'
import Products from '../containers/Products'
import Scroll from 'react-scroll'
import Waypoint from 'react-waypoint'


const styles = StyleSheet.create({
  section: {
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
  	backgroundSize:  "cover",
  	backgroundColor: "#000",
    opacity: 1,
  },
  content: {
    flexGrow: 1,
    overflowY: 'scroll',
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
    padding: 0, margin: 0,
  },
  glyph: {
    color: 'red',
    fontSize: '8em'
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

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { width: '0', height: '0', scrolled: false};
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  async componentDidMount() {
    loadApp()
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  scrolledBeforeLogo(value) {
    store.dispatch({type: 'SET_SCROLLED_BEFORE_LOGO', scrolled: value})
  }

  scrolledAfterLogo(value) {
    store.dispatch({type: 'SET_SCROLLED_AFTER_LOGO', scrolled: value})
  }

  scrollToTop() {
    // scroll.scrollToTop()
  }

  scrolled(value) {
    this.setState({scrolled: value})
  }


  render() {
    const scrolled = this.state.scrolled
    return (
      <div>
      <div style={ {height: this.state.height+'px'} } className={css(styles.section)}>
        <MediaQuery query='(max-device-width: 515px)'>
          <div><Waypoint onEnter={this.scrolled.bind(this, false)} onLeave={this.scrolled.bind(this, true)}/></div>
          <div className={css(styles.waypoint1)}><Waypoint onEnter={this.scrolledBeforeLogo.bind(this, false)} onLeave={this.scrolledBeforeLogo.bind(this, true)}/></div>
          <div className={css(styles.waypoint2)}><Waypoint onEnter={this.scrolledAfterLogo.bind(this, false)} onLeave={this.scrolledAfterLogo.bind(this, true)}/></div>
        </MediaQuery>
        <div style={{flexGrow: 0}}><Header/></div>
        <div className={css(styles.content)}>
          {this.props.children}
        </div>
        <MediaQuery query='(min-device-width: 516px)'>
          <div style={{flexGrow: 0}}><Footer/></div>
        </MediaQuery>

        <MediaQuery query='(max-device-width: 515px)'>
          <div style={{flexGrow: 0, eight: '5em', textAlign: 'center'}}>
            { !scrolled && <DownArrow/> }
          </div>
        </MediaQuery>
      </div>
      <MediaQuery query='(max-device-width: 515px)'>
        <div style={ {height: this.state.height+'px'} }>
          <Products/>
        </div>
        <div style={ {height: '600px'} }>
          <Ideas/>
        </div>
        <div style={ {height: '600px'} }>
          <Inspiration/>
        </div>
        <div style={ {height: '670px'} }>
          <About/>
        </div>
      </MediaQuery>
      </div>
    )
  }
}
