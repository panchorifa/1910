import React, {Component} from 'react'
import {connect} from 'react-redux'
import {store} from '../store'
import Scroll from 'react-scroll'
import {StyleSheet, css} from 'aphrodite'
import {atLeastSmall, upToShorty, upToSmall, upToSkinny, upToBig,
        atLeastMediumBig,
        atLeastBig} from '../libs/media'
import {msg} from '../libs/services'
import {color1, color2, color5} from '../libs/colors'

const styles = StyleSheet.create({
  product: {
    alignItems: 'center',
    margin: '0',
    borderRadius: '.5em',
    boxShadow: '2px 2px 6px rgba(0,0, 0, 0.2)',
    color: '#fff',
    fontSize: '1.4vh',
    width: '18em',
    [upToSmall]: {
      fontSize: '.6em',
      margin: '0 5px 10px 5px',
      textAlign: 'center',
      paddingTop: '1em',
    },
    [upToShorty]: {
      paddingTop: '1em',
      width: '17em',
      fontSize: '.7em',
    },
    [atLeastSmall]: {
      margin: '.5em'
    },
    [atLeastMediumBig]: {
      paddingTop: '1em'
    },
    [atLeastBig]: {
      width: '22em',
      paddingTop: '1em'
    },
  },

  productLink: {
    display: 'flex', flexFlow: 'column', justifyContent: 'center',
    textDecoration: 'none',
    padding: '1em',
    borderRadius: '.3em',
    color: '#fff',
    [upToSkinny]: {
      paddingTop: 0,
    },
    [atLeastSmall]: {
      minWidth: '16em',
    },
  },

  details: {
    padding: '0 0 .5em 0',
    [upToSmall]: {
      textAlign: 'center',
    }
  },

  title: {
    fontWeight: 'bold',
    fontSize: '1.7em',
    padding: '1.4em 0 0 0',
    textAlign: 'center',
    [upToSmall]: {
      fontSize: '2em',
      lineHeight: '1em',
      marginTop: '-.25em'
    }
  },

  description: {
    padding: '.25em 0 0 0',
    textAlign: 'center',
    fontSize: '1.5em',
    lineHeight: '1.25em',
    textDecoration: 'none',
    [upToSmall]: {
      padding: '.25em 0 0 0'
    }
  },

  imageWrapper: {
    border: '2px solid '+color2,
    textAlign: 'center',
    height: '8em',
    width: '8em',
    marginTop: '1em',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '-1.5em',
    borderRadius: '.25em',
    display: 'flex', flexFlow: 'row', justifyContent:'center',
    backgroundColor: '#000',
    borderRadius: '10em',
    [upToSmall]: {
      maxWidth: '8em',
    },
    [upToShorty]: {
      width: '8em',
    }
  },

  image: {
    textAlign: 'right',
    padding: '0',
    [upToSmall]:{
      width: '7em',
      padding: '1em',
      textAlign: 'left',
    },
    [atLeastSmall]: {
      width: '9vh',
      padding: '1em'
    },
    [upToShorty]: {
      width: '7em',
      padding: '1em',
    }
  }
})

const scroller = Scroll.scroller

class Product extends Component {

  constructor({id, name, link, img}) {
    super()
    this.id = id
    this.name = name
    this.link = link
    this.img = img
  }

  handleClick = (e) => {
    store.dispatch({type: 'SET_SECTION', section: 2})
    scroller.scrollTo('ideas', {
      duration: 1500,
      delay: 100,
      smooth: true
    })
  }

  render() {
    const description = msg(this.props.lang, `products.${this.id}.description`)
    const ideas = this.props.id === 'anyideas'
    const style = {
      backgroundColor: ideas ? '#000' : color2,
    }
    const href = ideas ? 'javascript:void(0);' : this.link
    const target = ideas ? '' : '_blank'
    return (
      <div style={style} className={css(styles.product)}>
        <a onClick={this.handleClick} className={css(styles.productLink)}
           rel={this.link} href={href} target="_blank">
          <div style={{padding: this.props.id === 'xmuni' ? '1em' : '.5em' }}
              className={css(styles.imageWrapper)}>
            <img className={css(styles.image)} src={this.img} alt={`${this.name}`}/>
          </div>
          <div className={css(styles.details)}>
            <div className={css(styles.title)}>{this.name}</div>
            <div style={{textDecoration: 'none',
                    color: ideas ? '#999' : color5}}
                 className={css(styles.description)}>{description}</div>
          </div>
        </a>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    lang: store.lang
  }
}

export default connect(mapStateToProps)(Product)
