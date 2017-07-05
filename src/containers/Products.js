import React, { Component } from 'react';
import { connect }          from 'react-redux'
import {store} from '../store'
import { StyleSheet, css }  from 'aphrodite'
import Content              from '../layout/Content'
import Product              from '../components/Product'
import {msg}                from '../libs/services'
import {upToSmall, upToShorty, atLeastSmall,
        atLeastMediumBig, atLeastBig} from '../libs/media'
import Subscriptions        from '../components/SubscriptionSmall'


const styles = StyleSheet.create({
  section: {
    flexGrow: 1,
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
  },
  products: {
    flexGrow: 1,
    display: 'flex', flexFlow: 'row wrap', justifyContent: 'center',
    paddingTop: '2em',
    [upToSmall]: {
      paddingTop: 0,
    },
    [upToShorty]: {
      paddingTop: '5em'
    },
    [atLeastMediumBig]: {
      maxWidth: '80%',
      margin: '0 auto'
    },
    [atLeastBig]: {
      maxWidth: '90%',
      margin: '0 auto'
    },
    [atLeastSmall]: {
      '@media screen and (orientation:landscape) and (max-height: 515px)': {
        marginTop: '-1em',
        maxWidth: '100%',
      }
    }
  },
  subscription: {
    flexGrow: 0,
    display: 'none',
    margin: '3em 0 0 0',
    height: '10em',
    [upToSmall]: {
      // border: '1px solid red',
      display: 'block'
    }
  }
})

class Products extends Component {
  componentWillMount() {
    store.dispatch({type: 'SET_SECTION', section: 1})
  }

  render() {
    const productList = msg(this.props.lang, 'products.products')
    return (
      <Content prefix='products.title.prefix'
               title='products.title.value'
               description='products.description'>
          <div className={css(styles.products)}>
            { productList.map((product, index) => (
              <Product {...product} key={'product'+this.props.lang+index}/>
            )) }
          </div>
          <div className={css(styles.subscription)}><Subscriptions/></div>
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

export default connect(mapStateToProps)(Products)
