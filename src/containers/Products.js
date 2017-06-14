import React, { Component } from 'react';
import { connect }          from 'react-redux'
import { StyleSheet, css }  from 'aphrodite'
import Content              from '../layout/Content'
import Product              from '../components/Product'
import {msg}                from '../libs/services'
import {upToSmall}          from '../libs/media'
import Subscriptions        from '../components/SubscriptionSmall'


const styles = StyleSheet.create({
  products: {
    flexGrow: 1,
    display: 'flex', flexFlow: 'row wrap', justifyContent: 'center',
    [upToSmall]: {
      flexFlow: 'column',
      justifyContent: 'center'
    },
  }
})

class Products extends Component {

  render() {
    const productList = msg(this.props.lang, 'products.products')
    const show = this.props.section === 0 || window.innerHeight < 737
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
