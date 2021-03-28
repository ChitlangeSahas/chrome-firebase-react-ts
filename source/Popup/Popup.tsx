import * as React from 'react'
import {MemoryRouter as Router, Route, Switch} from 'react-router-dom'

import './styles.scss'
import '../firebase'
import TabbedPage from '../UI-Components/TabbedPage'
import PromptPage from '../UI-Components/PromptPage'

const Popup: React.FC = () => {
  return (
    <div style={{width: '300px'}}>
      <Router>
        <Switch>
          <Route path={'/user/:userID'} component={PromptPage}/>
          <Route component={TabbedPage} exact/>
        </Switch>
      </Router>
    </div>
)
}

export default Popup
