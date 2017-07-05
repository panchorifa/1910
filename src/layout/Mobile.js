import React from 'react'
import FontAwesome from 'react-fontawesome'
import {StyleSheet, css} from 'aphrodite'
import Inspiration from '../containers/Inspiration'
import About from '../containers/About'
import Ideas from '../containers/Ideas'
import Products from '../containers/Products'
import Scroll from 'react-scroll'

import {color2} from '../libs/colors'

const Element = Scroll.Element

const styles = StyleSheet.create({
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

export default class Mobile extends React.Component {
  constructor() {
    super()
    this.state = { height: window.innerHeight }
  }

  scrollToTop() {
    scroll.scrollTo(0)
  }

  render() {
    return (
      <div>
        <div style={ {marginTop: '-2em', height: (this.state.height+100)+'px'} }>
          <Element name="products" style={{height: '4em'}}></Element>
          <Products/>
        </div>
        <div style={ {height: '580px'} }>
          <Element name="inspiration" style={{height: '4em'}}></Element>
          <Inspiration/>
        </div>
        <div style={ {height: '600px'} }>
          <Element name="ideas" style={{height: '4em'}}></Element>
          <Ideas/>
        </div>
        <div style={ {height: window.innerHeight+'px', position: 'relative'} }>
          <Element name="about" style={{height: '3em'}}></Element>
          <About/>
          <div style={{position: 'absolute', bottom: '1.5em', width: '100vw'}}>
            <div style={{textAlign: 'center', margin: '0 auto'}}>&copy; 1910 Inc.</div>
          </div>
          <div onClick={this.scrollToTop.bind(this)} className={css(styles.up)}>
            <FontAwesome name="chevron-up" size='2x'/>
          </div>
        </div>
      </div>
    )
  }
}
