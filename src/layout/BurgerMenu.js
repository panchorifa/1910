import React from 'react'
import {connect} from 'react-redux'
import Scroll from 'react-scroll'
import {store} from '../store'
import {StyleSheet, css} from 'aphrodite'
import FontAwesome from 'react-fontawesome'
import {color2} from '../libs/colors'
import Logo from '../components/Logo'

const scroll = Scroll.animateScroll
const scroller = Scroll.scroller;

const styles = StyleSheet.create({
  section: {
    backgroundColor: color2,
    height: '100vh',
    width: '100%',
    position: 'absolute', top: 0, left: 0,
    color: '#fff'
  },
  close: {
    padding: '.75em',
    textAlign: 'right'
  },
  menu: {
    margin: '2em 1em',
  },
  entry: {
    borderBottom: '2px solid #0086b9',
    padding: '.5em 1em',
    margin: '0 .5em',
    fontSize: '1.25em',
    ':first-child': {
      borderTop: '2px solid #0086b9'
    }
  }
})

class BurgerMenu extends React.Component {
  close() {
    store.dispatch({type: 'SET_BURGER', burger: false})
  }
  handleClick(value) {
    store.dispatch({type: 'SET_BURGER', burger: false})
    scroller.scrollTo(value, {
        duration: 1500,
        delay: 100,
        smooth: true
      }
    )
  }


  render() {
    return (
      <div className={css(styles.section)}>
        <div className={css(styles.close)}>
          <div onClick={this.close.bind(this)}><FontAwesome name="close" size='2x'/></div>
        </div>
        <div style={{textAlign: 'center'}}><Logo height={2}/></div>
        <div className={css(styles.menu)}>
          <div onClick={this.handleClick.bind(this, 'home')} className={css(styles.entry)}>Home</div>
          <div onClick={this.handleClick.bind(this, 'products')} className={css(styles.entry)}>Products</div>
          <div onClick={this.handleClick.bind(this, 'inspiration')} className={css(styles.entry)}>Inspiration</div>
          <div onClick={this.handleClick.bind(this, 'ideas')} className={css(styles.entry)}>Ideas</div>
          <div onClick={this.handleClick.bind(this, 'about')} className={css(styles.entry)}>About</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    burger: store.burger
  }
}

export default connect(mapStateToProps)(BurgerMenu)
