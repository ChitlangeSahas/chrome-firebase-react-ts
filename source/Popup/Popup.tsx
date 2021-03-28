import * as React from 'react'
import {MemoryRouter as Router, Route, Switch} from 'react-router-dom'

import './styles.scss'
import '../firebase'
import TabbedPage from '../UI-Components/TabbedPage'
import Page from '../UI-Components/Page'

const Popup: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/user/:userID'} component={Page}/>
        <Route component={TabbedPage} exact/>
      </Switch>
    </Router>
)
}

export default Popup
