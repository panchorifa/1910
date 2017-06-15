import React, {Component} from 'react'
import {connect} from 'react-redux'
import Content from '../layout/Content'
import Quotes from '../components/Quotes'

class Inspiration extends Component {
  render() {
    const show = this.props.section === 1 || this.props.show
    return show && <Content
              prefix='inspiration.title.prefix'
              title='inspiration.title.value'
              description='inspiration.description'
              maxDescriptionWidth='520px'>
            <Quotes/>
        </Content>
  }
}

const mapStateToProps = (store) => {
  return {
    section: store.section
  }
}

export default connect(mapStateToProps)(Inspiration)
