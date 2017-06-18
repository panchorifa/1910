import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, css} from 'aphrodite'
import {color1, color2, color3} from '../libs/colors'
import {upToShort} from '../libs/media'
import {subscribe, validEmail} from '../libs/services'
import {msg} from '../libs/services'

const styles = StyleSheet.create({
  section: {
    marginTop: '1em',
    height: '14em',
    [upToShort] : {
      marginTop: 0,
      height: '8em',
    }
  },
  title: {
    color: '#888',
    textAlign: 'center',
    paddingTop: '5px'
  },
  title2: {
    color: color2,
    maxWidth: '20em',
    margin: '0 auto',
    borderBottom:'2px solid '+color2,
    textAlign: 'center',
    paddingTop: '5px'
  },
  block: {
    backgroundColor: '#eee',
    borderRadius: '3px',
    padding: '1em 1em',
    color: color3,
    width: '34em',
    margin: '0 auto',
    marginTop: '1em',
    display: 'flex', flexFlow: 'row', justifyContent: 'stretch'
  },
  subscribe: {
    color: '#aaa',
    flexGrow:0,
    width: '5em',
    lineHeight: '3em',
  },
  form: {
    flexGrow: 1,
    display: 'flex', flexFlow: 'row', justifyContent: 'stretch'
  },
  button: {
    cursor: 'pointer',
    flexGrow: 0,
    textAlign: 'right',
    backgroundColor: color2,
    padding: '.5em 1em',
    lineHeight: '2em',
    color: '#fff',
    borderRadius: '3px',
    ':hover': {
      backgroundColor: color1
    }
  },
  input: {
    flexGrow: 1,
    borderRadius: '3px',
    margin: '0 1em',
    fontSize: '1em',
    padding: '3px 6px',
  }
})

class SubscriptionLarge extends Component {
  constructor(props){
    super(props)
    this.state = { email: '', subscribed: false, invalid: false }
  }

  handleChange = (event) => {
    const email = event.target.value
    this.setState({email: email, invalid: false})
  }

  handleSignup = (e) => {
    if(validEmail(this.state.email)) {
      subscribe(this.state.email)
      this.setState({ invalid: false, subscribed: true })
    } else {
      this.setState({ invalid: true })
    }
  }

  render() {
    const lang = this.props.lang
    const color = this.state.invalid ? 'red' : '#fff'
    const style = {
      color: '#444',
      border: '1px solid ' + color
    }
    return (
       <div className={css(styles.section)}>
         { !this.state.subscribed &&
          <div className={css(styles.block)}>
          <div className={css(styles.subscribe)}>
            {msg(lang, 'misc.subscribe')}
          </div>
          <div className={css(styles.form)}>
            <input type="text" id="email"
                    style= {style}
                   onChange={ this.handleChange }
                   className={css(styles.input)}
                   placeholder={msg(lang, 'misc.yourEmail')}/>
          </div>
          <div onClick={ this.handleSignup } className={css(styles.button)}>
            {msg(lang, 'misc.signup')}
          </div>
        </div> }

        { !this.state.subscribed && !this.state.invalid && <div className={css(styles.title)}>
          {msg(lang, 'subscriptions.description')}
        </div> }

        { this.state.invalid && <div className={css(styles.title)}>
          <span style={{color: 'red'}}>Please enter a valid email.</span>
        </div> }

        { this.state.subscribed && <div className={css(styles.title2)}>
          You have been subscribed. Thank you.
        </div> }
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    lang: store.lang
  }
}

export default connect(mapStateToProps)(SubscriptionLarge)
