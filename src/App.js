import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, css} from 'aphrodite'
import Home from './containers/Home'
import Inspiration from './containers/Inspiration'
import About from './containers/About'
import Ideas from './containers/Ideas'
import Products from './containers/Products'
import Layout from './layout'
import {loadApp} from './libs/services'


class App extends Component {

  async componentDidMount() {
    loadApp()
  }

  render() {
    const app = this.props.app
    return app && <Layout>
        <Home/>
        <Products/>
        <Ideas/>
        <Inspiration/>
        <About/>
      </Layout>
  }
}

const mapStateToProps = (store) => {
  return {
    app: store.app
  }
}

export default connect(mapStateToProps)(App)
