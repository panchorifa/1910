import React, { Component } from 'react'
import {withRouter, Link}   from 'react-router-dom'
import { connect }          from 'react-redux'
import { store }            from '../store'
import { StyleSheet, css }  from 'aphrodite'
import { msg }              from '../libs/services'
import {color2}             from '../libs/colors'

const styles = StyleSheet.create({
  component: {
    display: 'flex', flexFlow: 'row',
    height: '2.5em',
    paddingTop: '1em',
    userSelect: 'none',
  },
  link: {
    fontSize: '1.2em',
    marginRight: '1em',
    ':last-child': {

    }
  }
})

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class Navigation extends Component {
  handleClick(section) {
    store.dispatch({type: 'SET_SECTION', section: section})
  }

  render() {
    const path = this.props.location.pathname
    const sections = msg(this.props.lang, 'home.menu')
    return (
      <div className={css(styles.component)}>
        { sections && sections.map((section, index) => (
          <Link key={index} style={{
                    color: path === `/${section}` ? '#FFF' : '#666',
                    padding: '0 4px',
                    lineHeight: '.7em',
                    textDecoration: 'none',
                    borderBottom: path === `/${section}` ? '6px solid '+color2 : '6px solid #000'
                }}
                className={css(styles.link)}
                to={`/${section}`}>{capitalize(section)}</Link>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    lang: store.lang
  }
}

export default withRouter(connect(mapStateToProps)(Navigation))
