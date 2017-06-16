import React, { Component } from 'react';
import { connect }          from 'react-redux'
import { StyleSheet, css }  from 'aphrodite'
import Content              from '../layout/Content'
import Product              from '../components/Product'
import {msg}                from '../libs/services'
import {upToSmall, upToShorty,
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
      maxWidth: '70%',
      margin: '0 auto'
    },
    [atLeastBig]: {
      maxWidth: '85%',
      margin: '0 auto'
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
  render() {
    const productList = msg(this.props.lang, 'products.products')
    const show = this.props.section === 0 || this.props.show
    return (
       show &&
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
