import * as React from 'react'
import {MemoryRouter as Router, Route, Switch} from 'react-router-dom'

import './styles.scss'
import '../firebase'
import TabbedPage from '../TabbedPages'
import UserInfoPage from '../User/UserInfoPage'

const Popup: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/user/:userID'} component={UserInfoPage}/>
        <Route component={TabbedPage} exact/>
      </Switch>
    </Router>
)
}

export default Popup
