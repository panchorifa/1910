import React, {Component} from 'react'
import {connect} from 'react-redux'
import {store} from '../store'
import Content from '../layout/Content'
import Quotes from '../components/Quotes'

class Inspiration extends Component {
  componentWillMount() {
    store.dispatch({type: 'SET_SECTION', section: 2})
  }

  render() {
    return <Content
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
