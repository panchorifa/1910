import React, {Component} from 'react'
import {StyleSheet, css} from 'aphrodite'
import Label from '../components/Label'
import Description from './Description'
import Subscriptions from './Subscriptions'
import {upToSmall, upToShorty, upToShort, upToTall} from '../libs/media'
import {color2} from '../libs/colors'


const styles = StyleSheet.create({
  section: {
    flexGrow: 1,
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
    backgroundColor: '#fff',
    [upToSmall]: {
      flexGrow: 0,
      padding: '0 1em',
      // border: '10px solid red',
    },
  },
  header: {
    flexGrow: 0,
  },
  content: {
    flexGrow: 1,
    padding: 0,
    margin: '0 auto',
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
    width: '100%',
  },
  main: {
    flexGrow: 1,
    [upToSmall]: {
      marginTop: '2em'
    }
  },
  subscription: {
    flexGrow: 0,
    [upToSmall]: {
      display: 'none'
    },
    [upToShorty]: {
      display: 'none'
    },
    [upToTall]: {
      display: 'none'
    }
  },
  title: {
    flexGrow: 0,
    textAlign: 'center',
    lineHeight: '1.85em',
    verticalAlign: 'top',
    fontWeight: 100,
    width: '80%',
    margin: '0 auto',
    borderBottom: '1.5px solid #eee',
    padding: '.5em 0',
    [upToShorty]: {
      display: 'none'
    }
  },
  description: {
    height: '3em',
    margin: '0 auto',
    [upToShorty]: {
      display: 'none'
    }
  }
})

export default class Content extends Component {
  // props: prefix, title, description, maxDescriptionWith, children

  render() {
    const children = this.props.children
    const maxWidth = this.props.maxDescriptionWidth || null
    const width = maxWidth ? maxWidth : '600px'
    return (
      <div className={css(styles.section)}>
        <div className={css(styles.header)}>
          <h2 className={css(styles.title)}>
            <Label id={this.props.prefix}/> <Label style={{color:color2}} id={this.props.title}/>
          </h2>
          <div style={{maxWidth: width}} className={css(styles.description)}>
          { this.props.description && <Description id={this.props.description}/> }
          </div>
        </div>
        <div className={css(styles.content)}>
          <div className={css(styles.main)}>{children}</div>
        </div>
        <div className={css(styles.subscription)}><Subscriptions/></div>
      </div>
    )
  }
}

// <div className={css(styles.main)}>{children}</div>
// <div className={css(styles.subscription)}><Subscriptions/></div>
