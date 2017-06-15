import React from 'react'
import FontAwesome from 'react-fontawesome'
import Scroll from 'react-scroll'
import { StyleSheet, css } from 'aphrodite'

const scroller = Scroll.scroller

const styles = StyleSheet.create({
  arrow: {
    position: 'fixed',
    bottom: '.15em',
    left: '50%',
    marginLeft: '-20px',
    zIndex: 20000,
    color: 'white'
  },

  bounce: {
  	animationName: {
    	'0%, 20%, 50%, 80%, 100%': {transform: 'translateY(0)'},
    	'40%': {transform: 'translateY(-30px)'},
    	'60%': {transform: 'translateY(-15px)'}
    }
  },

  animated: {
    animationIterationCount:  'infinite',
    animationFillMode: 'both',
    animationDuration: '4s'
  },

  glyph: {
    fontSize: '3em',
    color: '#fff'
  }
})

export default class DownArrow extends React.Component {

  handleClick() {
    scroller.scrollTo('products', {
      duration: 1500,
      delay: 100,
      smooth: true
    })
  }

  render() {
    return(
      <div onClick={this.handleClick.bind(this)}
           className={css(styles.arrow, styles.animated, styles.bounce)}>
        <FontAwesome name='chevron-down' size='2x' className={css(styles.glyph)} />
      </div>
    )
  }
}
