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
import MediaQuery from 'react-responsive'
import {atLeastSmall} from './libs/media'

const styles = StyleSheet.create({
  content: {
    flexGrow:1,
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
  }
})

class App extends Component {
  constructor(props){
    super(props)
    this.state = { width: '0', height: '0' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  async componentDidMount() {
    loadApp()
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    const app = this.props.app
    return app && <Layout>
        <Home/>
        <MediaQuery query='(min-device-width: 516px)'>
        <div className={css(styles.content)}>
          <Products show={false}/>
          <Inspiration show={false}/>
          <Ideas show={false}/>
          <About show={false}/>
        </div>
        </MediaQuery>
      </Layout>
  }
}

const mapStateToProps = (store) => {
  return {
    app: store.app
  }
}

export default connect(mapStateToProps)(App)
