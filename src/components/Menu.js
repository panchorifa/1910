import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { store }            from '../store'
import { StyleSheet, css }  from 'aphrodite'
import { msg }              from '../libs/services'
import MenuLink             from './MenuLink'

const styles = StyleSheet.create({
  component: {
    display: 'flex',
    flexFlow: 'row',
    paddingTop: '1em',
    userSelect: 'none'
  }
})

class Menu extends Component {
  handleClick(section) {
    store.dispatch({type: 'SET_SECTION', section: section})
  }

  render() {
    let sections = msg(this.props.lang, 'home.menu')
    return (
      <div className={css(styles.component)}>
        { sections && sections.map((section, index) => (
          <MenuLink key={'link'+index} name={section} index={index}/>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    section: store.section,
    lang: store.lang
  }
}

export default connect(mapStateToProps)(Menu)
