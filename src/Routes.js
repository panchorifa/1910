import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Home from './containers/Home'
import Products from './containers/Products'
import NotFound from './containers/NotFound'

export default ( {childProps } ) => (
  <Switch>
    <Route path="/" exact component={Home} props={childProps} />
    <Route path="/products" exact component={Products} props={childProps} />
    <Route component={NotFound} />
  </Switch>
)
