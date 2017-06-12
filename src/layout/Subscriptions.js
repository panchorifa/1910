import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import SubscriptionSmall from '../components/SubscriptionSmall'
import SubscriptionLarge from '../components/SubscriptionLarge'

export default class Subscriptions extends Component {

  render() {
    return (
      <div>
        <MediaQuery query='(max-device-width: 515px)'>
          <SubscriptionSmall/>
        </MediaQuery>
        <MediaQuery query='(min-device-width: 516px)'>
          <SubscriptionLarge/>
        </MediaQuery>
      </div>
    )
  }
}
