import React, {Component} from 'react'
import {connect} from 'react-redux'
import Home from './containers/Home'
import Inspiration from './containers/Inspiration'
import About from './containers/About'
import Ideas from './containers/Ideas'
import Products from './containers/Products'
import Layout from './layout'
import {loadApp} from './libs/services'


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
      </Layout>
  }
}

const mapStateToProps = (store) => {
  return {
    app: store.app
  }
}

export default connect(mapStateToProps)(App)
