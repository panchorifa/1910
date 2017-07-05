import React from 'react';
import { StyleSheet, css } from 'aphrodite'


const styles = StyleSheet.create({

  notfound: {
    paddingTop: '100px',
    textAlign: 'center'
  }

})

export default () => (
  <div className={css(styles.notfound)}>
    <h3>Sorry, page not found!</h3>
  </div>
)
