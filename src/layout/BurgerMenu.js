import React from 'react'
import {connect} from 'react-redux'
import Scroll from 'react-scroll'
import {store} from '../store'
import {StyleSheet, css} from 'aphrodite'
import FontAwesome from 'react-fontawesome'
import {color1,color2,color3,color4,color5} from '../libs/colors'
import Logo from '../components/Logo'
import SubscriptionSmall from '../components/SubscriptionSmall'

const scroll = Scroll.animateScroll
const scroller = Scroll.scroller;

const styles = StyleSheet.create({
  section: {
    backgroundColor: color3,
    height: '100vh',
    width: '100%',
    position: 'absolute', top: 0, left: 0,
    color: '#fff'
  },
  close: {
    color: '#222',
    padding: '.75em 1em',
    textAlign: 'right'
  },
  menu: {
    margin: '3em 1em',
  },
  entry: {
    borderBottom: '1px solid #ddd',
    padding: '.5em 1em',
    margin: '0 .5em',
    fontSize: '1.25em',
    color: '#666',
    ':first-child': {
      borderTop: '1px solid #ddd'
    }
  },
  footer: {
    height:'3em',
    color: '#222',
    position: 'fixed',
    bottom: '.4em',
    width: '100vw'
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
          <div onClick={this.close.bind(this)}>
            <FontAwesome name="close" size='2x'/>
          </div>
        </div>
        <div style={{textAlign: 'center'}}>
          <Logo color={'black'} height={2}/>
        </div>
        <div className={css(styles.menu)}>
          <div onClick={this.handleClick.bind(this, 'products')} className={css(styles.entry)}>Products</div>
          <div onClick={this.handleClick.bind(this, 'inspiration')} className={css(styles.entry)}>Inspiration</div>
          <div onClick={this.handleClick.bind(this, 'ideas')} className={css(styles.entry)}>Ideas</div>
          <div onClick={this.handleClick.bind(this, 'about')} className={css(styles.entry)}>About</div>
        </div>
        <div style={{marginTop:'3em'}}>
          <SubscriptionSmall/>
        </div>
        <div className={css(styles.footer)}>
          <div style={{textAlign: 'center', margin: '0 auto'}}>&copy; 1910 Inc.</div>
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
