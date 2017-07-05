import React, { Component } from 'react';
import { connect } from 'react-redux'
import {store} from '../store'
import FontAwesome from 'react-fontawesome'
import { StyleSheet, css } from 'aphrodite'
import Content from '../layout/Content'
import Label from '../components/Label'
import {upToSmall, upToShorty, atLeastSmall, atLeastMediumBig} from '../libs/media'
import {msg, sendIdea} from '../libs/services'
import {color1, color2, color3} from '../libs/colors'

const styles = StyleSheet.create({
  ideas: {
    display: 'flex', flexFlow: 'column', justifyContent: 'center',
    maxWidth: '50em',
    margin: '0 auto',
    [upToSmall]: {
      maxWidth: '100%',
      marginTop: '-1em'
    },
    [atLeastMediumBig]: {
      paddingTop: '2em'
    },
    [upToShorty]: {
      marginTop: '1.5em',
    },
    [atLeastSmall]: {
      padding: '1em',
      '@media screen and (orientation:landscape) and (max-height: 515px)': {
        margin: '.5em .25em 0 .25em',
      }
    },
  },
  form: {
    height: '20em',
    padding: '2em',
    backgroundColor: color1,
    borderRadius: '.25em',
    display: 'flex', flexFlow: 'column', justifyContent: 'center',
    [upToSmall]: {
      maxWidth: '100%',
      padding: '2em'
    },
    [atLeastSmall]: {
      '@media screen and (orientation:landscape) and (max-height: 515px)': {
        height: '17em',
      }
    },
  },
  form2: {
    height: '20em',
    backgroundColor: color2,
    display: 'flex', flexFlow: 'column', justifyContent: 'center',
    position: 'relative'
  },
  area: {
    borderRadius: '.25em',
    fontSize: '1em',
    padding: '5px',
    border: '3px solid #ddd',
    ':focus': {
      outline: 'none !important',
      border: '3px solid '+color2,
      boxShadow: '0 0 10px #719ECE'
    }
  },
  send: {
    cursor: 'pointer',
    backgroundColor: color2,
    borderRadius: '3px',
    padding: '.65em 1em',
    textAlign: 'center',
    marginTop: '1em',
    [upToSmall] : {
      maxWidth: '100%'
    },
    [atLeastSmall] :{
      width: '20em',
      margin: '1em auto 0 auto',
      '@media screen and (orientation:landscape) and (max-height: 515px)': {
        margin: '0 auto',
      }
    }
  },
  thankyou: {
    textAlign: 'center',
    color: '#fff',
    marginTop: '-1em',
    fontSize: '2em'
  },
  close: {
    cursor: 'pointer',
    position:'absolute', right: '1em', top:'1em'
  }
})

class Ideas extends Component {

  constructor(props) {
    super(props)
    this.state = { idea: '', thankyou: false }
  }

  componentWillMount() {
    store.dispatch({type: 'SET_SECTION', section: 1})
  }

  handleChange = (event) => {
    this.setState({idea: event.target.value})
  }

  handleClick = (event) => {
    this.setState({thankyou: true})
    sendIdea(this.state.idea)
    this.forceUpdate()
  }

  closeThanks = (event) => {
    this.setState({thankyou: false})
  }

  render() {
    const message = msg(this.props.lang, 'ideas.message')
    return (
        <Content prefix='ideas.title.prefix'
                 title='ideas.title.value'
                 description='ideas.description'>
          <div className={css(styles.ideas)}>
            { !this.state.thankyou &&
              <div className={css(styles.form)}>
                <textarea onChange={this.handleChange}
                    className={css(styles.area)} name="message"
                  placeholder={message} rows="7"/> }
                <div onClick={this.handleClick} className={css(styles.send)}>
                  <Label id={'ideas.send'} style={{color: color3}}/>
                </div>
            </div> }
            { this.state.thankyou &&
              <div className={css(styles.form2)}>
                <div onClick={this.closeThanks} className={css(styles.close)}>
                  <FontAwesome name="close" size="2x"/>
                </div>
                <div className={css(styles.thankyou)}>Thank you.</div>
              </div> }
          </div>
        </Content>
      )
  }
}

const mapStateToProps = (store) => {
  return {
    section: store.section,
    lang: store.lang
  }
}

export default connect(mapStateToProps)(Ideas)
