import React, {Component} from 'react'
import {StyleSheet, css} from 'aphrodite'
import {upToSmall, upToShort} from '../libs/media'
import Label from '../components/Label'


const styles = StyleSheet.create({
    section: {
      flexGrow: 0,
      textAlign:'center', color: '#444',
      margin: '2em auto',
      maxWidth: '420px',
      [upToShort]: {
        margin: '1em auto'
      },
      [upToSmall]: {
        fontSize: '.85em'
      },
    }
})

export default class Description extends Component {

  render() {
    const id = this.props.id
    return (
      <div className={css(styles.section)}>
        <Label id={id}/>
      </div>
    )
  }
}
