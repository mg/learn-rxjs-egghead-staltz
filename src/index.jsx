import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRedirect } from 'react-router'

import Main from './main.jsx'
import Video1 from './video01'
import Video2 from './video02'
import Video3 from './video03'
import Video4 from './video04'
import Video5 from './video05'

render((
  <Router>
    <Route path='/' component={Main}>
      <IndexRedirect to='v1'/>
      <Route path='v1' component={Video1} />
      <Route path='v2' component={Video2} />
      <Route path='v3' component={Video3} />
      <Route path='v4' component={Video4} />
      <Route path='v5' component={Video5} />
    </Route>
  </Router>
), document.getElementById('app'))
