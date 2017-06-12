import React, {Component} from 'react'
import {StyleSheet, css} from 'aphrodite'
import Header from './Header'
import Footer from './Footer'
import {color1, color2, color3} from '../libs/colors'
import {loadApp} from '../libs/services'

const styles = StyleSheet.create({
  section: {
    height: '100vh',
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
  	backgroundSize:  "cover",
  	backgroundColor: "#000",
    opacity: 1,
    zIndex: "-1"
  },
  content: {
    flexGrow: 1,
    overflowY: 'scroll',
    display: 'flex', flexFlow: 'column', justifyContent: 'stretch',
    padding: 0, margin: 0,
  }
})

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { width: '0', height: '0' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
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
    return (
      <div class="wrapper">
      <div className={css(styles.section)}>
        <div style={{flexGrow: 0}}><Header/></div>
        <div className={css(styles.content)}>
          {this.props.children}
        </div>
        <div style={{flexGrow: 0}}><Footer/></div>
        </div>
      </div>
    )
  }
}
