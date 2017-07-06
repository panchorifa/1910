import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {StyleSheet, css} from 'aphrodite'
import Layout from './layout'
import Routes from './Routes'
import {loadApp} from './libs/services'
import {upToSmall} from './libs/media'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from "react-tap-event-plugin"
import Mobile from './layout/Mobile'
injectTapEventPlugin()

const styles = StyleSheet.create({
  content: {
    flexGrow:1,
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
    [upToSmall]:{
      marginTop: '3em'
    }
  },
  mobile: {
    display: 'none',
    [upToSmall]: {
      display: 'flex', flexFlow: 'column', justifyContent: 'stretch'
    }
  }
})

class App extends Component {
  constructor(props){
    super(props)
    this.state = { width: '0', height: '0' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  async componentDidMount() {
    loadApp()
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    const app = this.props.app
    return app &&
    <MuiThemeProvider>
      <div>
        <Layout>
          <Routes />
        </Layout>
        <div className={css(styles.mobile)}>
          <Mobile/>
        </div>
      </div>
    </MuiThemeProvider>
  }
}

const mapStateToProps = (store) => {
  return {
    app: store.app,
    section: store.section
  }
}

export default withRouter(connect(mapStateToProps)(App))
