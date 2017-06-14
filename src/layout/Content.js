import React, {Component} from 'react'
import {StyleSheet, css} from 'aphrodite'
import Label from '../components/Label'
import Description from './Description'
import Subscriptions from './Subscriptions'
import {upToSmall} from '../libs/media'
import {color2} from '../libs/colors'


const styles = StyleSheet.create({
  section: {
    // flexGrow: 1,
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
    backgroundColor: '#fff',
    [upToSmall]: {
      padding: '0 1em'
    },
  },
  header: {
    flexGrow: 0,
    // maxHeight: '8em',
    // paddingBottom: '2em'
  },
  content: {
    flexGrow: 0,
    padding: 0,
    margin: '0 auto',
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
    width: '100%',
    // border: '1px solid blue'
  },
  main: {
    flexGrow: 1,
    [upToSmall]: {
      marginTop: '2em'
    }
  },
  subscription: {
    flexGrow: 0,
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
  },
})

export default class Content extends Component {
  // prefix, title, description, children

  render() {
    let children = this.props.children
    return (
      <div className={css(styles.section)}>
        <div className={css(styles.header)}>
          <h2 className={css(styles.title)}>
            <Label id={this.props.prefix}/> <Label style={{color:color2}} id={this.props.title}/>
          </h2>
          <div style={{height: '3em'}}>
          { this.props.description && <Description id={this.props.description}/> }
          </div>
        </div>
        <div className={css(styles.content)}>
          <div className={css(styles.main)}>{children}</div>          
        </div>
      </div>
    )
  }
}

// <div className={css(styles.main)}>{children}</div>
// <div className={css(styles.subscription)}><Subscriptions/></div>
