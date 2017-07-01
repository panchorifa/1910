import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import MediaQuery from 'react-responsive'
import FontAwesome from 'react-fontawesome'
import {store} from '../store'
import {StyleSheet, css} from 'aphrodite'
import Header from './Header'
import Footer from './Footer'
import DownArrow from '../components/DownArrow'
import {loadApp, isMobile} from '../libs/services'
import Inspiration from '../containers/Inspiration'
import About from '../containers/About'
import Ideas from '../containers/Ideas'
import Products from '../containers/Products'
import Scroll from 'react-scroll'
import Waypoint from 'react-waypoint'
import {color2} from '../libs/colors'

const Element = Scroll.Element

const styles = StyleSheet.create({
  section: {
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
  	backgroundColor: "#000",
  },
  content: {
    flexGrow: 1,
    overflowY: 'scroll',
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
    margin: 0, padding: 0
  },
  waypoint1: {
    position: 'absolute',
    top: '22%',
  },
  waypoint2: {
    position: 'absolute',
    top: '34%',
  },
  up: {
    position: 'absolute', right: '1em', bottom: '1em',
    backgroundColor: color2 ,
    color: '#fff',
    width: '3em',
    height: '3em',
    textAlign: 'center',
    borderRadius: '.2em',
    paddingTop:'.25em'
  }
})

const scroll = Scroll.animateScroll

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

  scrollToTop() {
    scroll.scrollTo(0)
  }

  scrolled(value) {
    this.setState({scrolled: value})
  }

  render() {
    const scrolled = this.state.scrolled
    const home = this.props.section < 0
    const burger = this.props.burger
    const height = isMobile() ? this.state.height+'px' : '100vh'
    return (
      <div>
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
                maxHeight: '5em',
                minHeight: '5em', textAlign: 'center'}}>
            { !burger && !scrolled && <DownArrow/> }
          </div>
        </MediaQuery>
      </div>
      <MediaQuery query='(max-device-width: 515px)'>
        <div style={ {marginTop: '-2em', height: (this.state.height+100)+'px'} }>
          <Element name="products" style={{height: '4em'}}></Element>
          <Products show={true}/>
        </div>
        <div style={ {height: '580px'} }>
          <Element name="inspiration" style={{height: '4em'}}></Element>
          <Inspiration show={true}/>
        </div>
        <div style={ {height: '600px'} }>
          <Element name="ideas" style={{height: '4em'}}></Element>
          <Ideas show={true}/>
        </div>
        <div style={ {height: window.innerHeight+'px', position: 'relative'} }>
          <Element name="about" style={{height: '3em'}}></Element>
          <About show={true}/>
          <div style={{position: 'absolute', bottom: '1.5em', width: '100vw'}}>
            <div style={{textAlign: 'center', margin: '0 auto'}}>&copy; 1910 Inc.</div>
          </div>
          <div onClick={this.scrollToTop.bind(this)} className={css(styles.up)}>
            <FontAwesome name="chevron-up" size='2x'/>
          </div>
        </div>
      </MediaQuery>
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
