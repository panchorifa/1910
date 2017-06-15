import React, { Component } from 'react'
import { connect } from 'react-redux'
import { store } from '../store'
import { StyleSheet, css } from 'aphrodite'
import { msg } from '../libs/services'
import { color2, color3, color4 } from '../libs/colors'

const styles = StyleSheet.create({
  section: {
    flexGrow: 0,
    padding: '1em 0 2em 0',
  },
  title: {
    color: color4,
    textAlign: 'center',
    paddingBottom: '.25em',
    maxWidth: '20em',
    margin: '0 auto',
    marginBottom: '1em',
    borderBottom: '1px solid #ddd',
  },
  subscribe: {
    textAlign: 'center',
  },
  input: {
    fontSize: '1em',
    width: '14em',
    border: '1px solid '+color2,
    borderRadius: '3px',
    padding: '7px 6px'
  },
  button: {
    backgroundColor: color2,
    borderRadius: '3px',
    color: color3,
    display: 'inline-block',
    width: '6em',
    textAlign: 'center',
    padding: '8px',
    margin: '-1px 0 0 .5em',
    verticalAlign: 'top'
  }
})


class SubscriptionSmall extends Component {

  handleInputChange(evt) {
    evt.preventDefault()
    store.dispatch({type:'SET_SUBSCRIBER', email: evt.target.value})
    this.forceUpdate()
  }

  handleSubmit(evt) {
    evt.preventDefault()
    if (this.props.subscriber.valid) {
      store.dispatch({type:'ADD_SUBSCRIBER'})
    }
  }

  render() {
    const lang = this.props.lang
    const subs = msg(lang, 'subscriptions')
    return (
      <div className={css(styles.section)}>
        <div className={css(styles.title)}>
          {subs.title.value}
        </div>
        <div className={css(styles.subscribe)}>
          <input type="text" placeholder="email"
              className={css(styles.input)}/>
          <div className={css(styles.button)}>
            {msg(lang, 'misc.signup')}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    lang: store.lang,
    subscriber: store.subscriber
  }
}

export default connect(mapStateToProps)(SubscriptionSmall)
