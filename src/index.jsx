import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRedirect } from 'react-router'

import Main from './main.jsx'
import Video1 from './video01'
import Video2 from './video02'

render((
  <Router>
    <Route path='/' component={Main}>
      <IndexRedirect to='v1'/>
      <Route path='v1' component={Video1} />
      <Route path='v2' component={Video2} />
    </Route>
  </Router>
), document.getElementById('app'))
