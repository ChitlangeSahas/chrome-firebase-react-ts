import {Action} from '../creators'
import {ModristUser} from '../../User/types'

export interface AppState {
  currentUsers: ModristUser[]
}

const initialState = (): AppState => {
  return {
    currentUsers: []
  }
}

const appReducer = (state = initialState(), action: Action): AppState => {
  switch (action.type) {
    case 'CREATE_USER':
      state.currentUsers.push(action.user)
      return state
    default:
      return state
  }
}

export default appReducer