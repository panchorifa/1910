import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, css} from 'aphrodite'
import {color1, color2, color3} from '../libs/colors'
import {upToShort} from '../libs/media'
import {subscribe} from '../libs/services'
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
    border: 'none',
    margin: '0 1em',
    fontSize: '1em',
    padding: '3px 6px',
  }
})

class SubscriptionLarge extends Component {
  constructor(props){
    super(props)
    this.state = { email: '' }
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  handleSignup = (event) => {
    subscribe(this.state.email)
  }

  render() {
    const lang = this.props.lang
    return (
      <div className={css(styles.section)}>
        <div className={css(styles.block)}>
          <div className={css(styles.subscribe)}>
            {msg(lang, 'misc.subscribe')}
          </div>
          <div className={css(styles.form)}>
            <input type="text" id="email"
                   onChange={ this.handleChange }
                   className={css(styles.input)} placeholder={msg(lang, 'misc.yourEmail')}/>
          </div>
          <div onClick={ this.handleSignup } className={css(styles.button)}>
            {msg(lang, 'misc.signup')}
          </div>
        </div>
        <div className={css(styles.title)}>
          {msg(lang, 'subscriptions.description')}
        </div>
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
