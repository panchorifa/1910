import React, { Component } from 'react'
import { connect } from 'react-redux'
import { store } from '../store'
import { StyleSheet, css } from 'aphrodite'
import { subscribe, msg, validEmail } from '../libs/services'
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
  constructor(props){
    super(props)
    this.state = { email: '', subscribed: false, invalid: false }
  }

  handleChange = (event) => {
    this.setState({email: event.target.value})
  }

  handleSignup = (e) => {
    console.log(this.state.email)
    console.log(validEmail(this.state.email))
    if(validEmail(this.state.email)) {
      subscribe(this.state.email)
      this.setState({ invalid: false, subscribed: true })
    } else {
      this.setState({ invalid: true })
    }
  }

  render() {
    const lang = this.props.lang
    const subs = msg(lang, 'subscriptions')
    const color = this.state.invalid ? 'red' : color2
    const style = { border: '1px solid ' + color }
    return (
      <div className={css(styles.section)}>
        { this.state.subscribed &&
        <div className={css(styles.title)}>
          <div style={{color: color2}}>You have been subscribed. Thank you.</div>
        </div> }

        { !this.state.subscribed &&
        <div className={css(styles.title)}>
          {subs.title.value}
        </div> }
        { !this.state.subscribed &&
        <div className={css(styles.subscribe)}>
          <input onChange={this.handleChange}
                 style={style}
                 type="text" placeholder="email"
                 className={css(styles.input)}/>
          <div onClick={this.handleSignup} className={css(styles.button)}>
            {msg(lang, 'misc.signup')}
          </div>
        </div> }
        { this.state.invalid && <div style={{color: 'red',
            textAlign: 'center', marginLeft: '-8em'}}>
          Please enter a valid email.
        </div>}

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
