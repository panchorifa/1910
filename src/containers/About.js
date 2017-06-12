import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Content from '../layout/Content'
import Label from '../components/Label'
import Map from '../components/Map'
import {upToSmall, upToShort, atLeastBig, atLeastSmall} from '../libs/media'
import {color2} from '../libs/colors'


const styles = StyleSheet.create({
  sections: {
    display: 'flex', flexFlow: 'row', justifyContent: 'space-between',
    [upToSmall]:{
      flexFlow: 'column',
      justifyContent: 'stretch',
    },
    [atLeastSmall]: {
      maxWidth: '60em',
      margin: '0 auto'
    }
  },
  section: {
    flexBasis: 'auto',
    flexGrow: 1,
    maxWidth: '24em',
    margin: '0 2em',
    [upToSmall]: {
      fontSize: '.85em',
      marginTop: '1em',
      margin: '1em .5em 0 .5em',
      ':first-child': {
        marginTop: '-1em'
      }
    },
  },
  title: {
    marginBottom: '.5em',
    [upToSmall]: {
      fontSize: '1em'
    }
  },
  map: {
    width: '100%',
    height: '220px',
    margin: '1em 0 0 0',
    [upToShort]: {
      height: '140px',
      [upToSmall]: {
        margin: '1em 0 0 0',
        height: '100px',
      },
    },
  },

})

class About extends Component {

  constructor() {
    super()
    this.sections = ['team', 'community', 'careers']
  }

  render() {
    const sections = this.sections
    return this.props.section === 3 &&
      <Content prefix='about.title.prefix' title='about.title.value'>
         <div className={css(styles.sections)}>
            { sections.map((section, index) => (
            <div key={`about${index}`} className={css(styles.section)}>
              <div className={css(styles.title)}>
                <Label style={{color: color2}} id={`about.${section}.title`}/>
              </div>
              <div className={css(styles.description)}>
                <Label style={{color:'#444'}} id={`about.${section}.content`}/>
              </div>
            </div>
            )) }
         </div>
         <div className={css(styles.map)}><Map/></div>
      </Content>
  }
}

const mapStateToProps = (store) => {
  return {
    section: store.section
  }
}

export default connect(mapStateToProps)(About)
