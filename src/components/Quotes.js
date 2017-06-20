import React, {Component} from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import { upToSmall, upToShorty, upToTall, atLeastSmall } from '../libs/media'
import {loadQuote} from '../libs/services'
import {color1, color3} from '../libs/colors'

const styles = StyleSheet.create({
  component: {
    display: 'flex', flexFlow: 'column', justifyContent: 'center',
    width: '100%',
    cursor: 'pointer',
    padding: '0 1em',
    borderRadius: '2px',
    margin: '2em auto',
    maxWidth: '680px',
    fontSize: '1em',
    [upToSmall]: {
      marginTop: '1em',
      fontSize: '.6em',
    },
    [atLeastSmall]: {
      minHeight: '12.75em',
      paddingTop: '1em',
    },
    [upToShorty]: {
      marginTop: '2em',
      fontSize: '.8em',
    },
  },

  block: {
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
    backgroundColor: color1,
    color: color3,
    padding: '1em',
    height: '20em',
    borderRadius: '.25em',
  },

  quote: {
    flexGrow: 1,
    display: 'flex', flexFlow: 'column', justifyContent: 'center',
    fontSize: '1.5em',
    fontWeight: 300,
    lineHeight: 2,
    padding: '0 50px',
    letterSpacing: '0',
    position: 'relative',
    [atLeastSmall]: {
      fontSize: '1.6em',
      padding: '0 4em'
    },
    [upToTall]: {

    },
    ':before': {
      fontSize: '6em',
      fontWeight: 300,
      lineHeight: 0,
      position: 'absolute',
      top: '50%',
      left: 0,
      marginTop: '-15px',
      content: "'\\00ab'",
    },
    ':after': {
      fontSize: '6em',
      fontWeight: 300,
      lineHeight: 0,
      position: 'absolute',
      top: '50%',
      right: 0,
      marginTop: '-15px',
      content: "'\\00bb'",
    },
  },

  author: {
    flexGrow: 0,
    height: '2em',
    textAlign: 'right',
    fontSize: '1.3em',
  }
})


class Quotes extends Component {
  nextQuote() {
    loadQuote()
  }

  render() {
    const quote = this.props.quote
    return quote &&
      <div className={css(styles.component)} onClick={this.nextQuote.bind(this)}>
        <div className={css(styles.block)}>
          <div className={css(styles.quote)}>
            {quote.quote}
          </div>
          <div className={css(styles.author)}>
            <cite> - {quote.author}</cite>
          </div>
        </div>
      </div>

  }
}

const mapStateToProps = function(store) {
  return {
    quote: store.quote
  }
}

export default connect(mapStateToProps)(Quotes)
