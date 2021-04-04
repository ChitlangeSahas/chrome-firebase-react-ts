import * as React from 'react'
import {MemoryRouter as Router, Route, Switch} from 'react-router-dom'

import './styles.scss'
import '../firebase'
import {useContext} from 'react'
import TabbedPage from '../UI-Components/TabbedPage'
import PromptPage from '../UI-Components/PromptPage'
// eslint-disable-next-line import/namespace,import/default
import SignIn from '../UI-Components/SignIn'
import UserProvider, {UserContext} from '../providers/UserProvider'

const InsidePopup: React.FC = () => {
  const user = useContext(UserContext)
  if(user != null)
  {
    return(
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
    return(
      <div style={{width: '300px'}}>
        <SignIn/>
      </div>
    )
  
  
  /* return (
    user ?
      <div style={{width: '300px'}}>
        <Router>
          <Switch>
            <Route path={'/user/:userID'} component={PromptPage}/>
            <Route component={TabbedPage} exact/>
          </Switch>
        </Router>
      </div> 
      :
      <div style={{width: '300px'}}>
        <SignIn/>
      </div>
  ) */
}

const Popup: React.FC = () => {
  return(
    <UserProvider>
      <InsidePopup />
    </UserProvider>
  )
}

export default Popup
