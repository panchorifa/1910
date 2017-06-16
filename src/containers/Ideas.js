import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Content from '../layout/Content'
import Label from '../components/Label'
import {upToSmall, upToShorty, atLeastSmall, atLeastMediumBig} from '../libs/media'
import {msg} from '../libs/services'
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
    [atLeastSmall]: {
      padding: '1em',
    },
    [atLeastMediumBig]: {
      paddingTop: '2em'
    },
    [upToShorty]: {
      marginTop: '1.5em',
    },
  },
  form: {
    padding: '2em',
    backgroundColor: color1,
    borderRadius: '.25em',
    display: 'flex', flexFlow: 'column', justifyContent: 'center',
    [upToSmall]: {
      maxWidth: '100%',
      padding: '2em'
    }
  },
  area: {
    borderRadius: '.25em',
    fontSize: '1em',
    padding: '5px',
    ':focus': {
      outline: 'none !important',
      border: '3px solid '+color2,
      boxShadow: '0 0 10px #719ECE'
    }
  },
  send: {
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
      margin: '1em auto 0 auto'
    }
  }
})

class Ideas extends Component {

  render() {
    const message = msg(this.props.lang, 'ideas.message')
    const show = this.props.section === 2 || this.props.show

    return show &&
        <Content prefix='ideas.title.prefix'
                 title='ideas.title.value'
                 description='ideas.description'>
          <div className={css(styles.ideas)}>
            <div className={css(styles.form)}>
              <textarea className={css(styles.area)} name="message"
                  placeholder={message} rows="7"/>
              <div className={css(styles.send)}>
                <Label id={'ideas.send'} style={{color: color3}}/>
              </div>
            </div>
          </div>
        </Content>
  }
}

const mapStateToProps = (store) => {
  return {
    section: store.section,
    lang: store.lang
  }
}

export default connect(mapStateToProps)(Ideas)

// componentDidMount() {
//   findDOMNode(this.refs.textarea).focus();
// }
