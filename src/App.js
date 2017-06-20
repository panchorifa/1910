import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
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
import {upToSmall, atLeastSmall} from './libs/media'

const styles = StyleSheet.create({
  content: {
    flexGrow:1,
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
    [upToSmall]:{
      marginTop: '3em'
    }
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
    const nothome = this.props.section > -1
    const app = this.props.app
    return app && <Layout>
        <Home/>
        { nothome && <MediaQuery query='(min-device-width: 516px)'>
        <div className={css(styles.content)}>
          <Products show={false}/>
          <Inspiration show={false}/>
          <Ideas show={false}/>
          <About show={false}/>
        </div>
        </MediaQuery> }
      </Layout>
  }
}

const mapStateToProps = (store) => {
  return {
    app: store.app,
    section: store.section
  }
}

export default withRouter(connect(mapStateToProps)(App))
