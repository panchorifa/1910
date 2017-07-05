import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Home from './containers/Home'
import Products from './containers/Products'
import Inspiration from './containers/Inspiration'
import Ideas from './containers/Ideas'
import About from './containers/About'
import NotFound from './containers/NotFound'

export default ( {childProps } ) => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/products" exact component={Products} />
    <Route path="/inspiration" exact component={Inspiration} />
    <Route path="/ideas" exact component={Ideas} />
    <Route path="/about" exact component={About} />
    <Route component={NotFound} />
  </Switch>
)
