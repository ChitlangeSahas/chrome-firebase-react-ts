import React, {Component, createContext} from 'react'
import {auth} from '../firebase'

export const UserContext = createContext({userName: null, userEmail:null})

class UserProvider extends Component{
  // eslint-disable-next-line react/state-in-constructor
  state = {
    userName: null,
    userEmail: null
  }

  componentDidMount = async () => {
    auth.onAuthStateChanged((userAuth: any) => {
      // eslint-disable-next-line react/no-set-state
      if(userAuth) {
        this.setState({userName: userAuth.displayName, userEmail: userAuth.email})
        console.log(userAuth.email)
        console.log(userAuth.displayName)
      }
    })
  }

  render(){
    return(
      <UserContext.Provider value={this.state}>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserProvider