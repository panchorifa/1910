import React, { Component } from 'react'
import { connect } from 'react-redux'
import { store } from '../store'
import { StyleSheet, css } from 'aphrodite'
import {loadQuote} from '../libs/services'

const styles = StyleSheet.create({
  component: {
    display: 'flex',
    flexFlow: 'row'
  },
  language: {
    marginLeft: '1em',
    cursor: 'pointer',
    userSelect: 'none'
  }
})

class Languages extends Component {

  handleClick(lang) {
    store.dispatch({type: 'SET_LANG', lang: lang})
    loadQuote()
  }

  render() {
    const langs = this.props.langs
    let l = this.props.lang
    return (
      <div className={css(styles.component)}>
        {
          langs && Object.keys(langs).map((lang, index) => (
            <div key={'lang'+index}
                onClick={this.handleClick.bind(this, lang)}
                style={{color: l === lang ? '#fff' : '#888'}}
                className={css(styles.language)}>{lang.toUpperCase()}</div>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    langs: store.langs,
    lang: store.lang
  }
}

export default connect(mapStateToProps)(Languages)
