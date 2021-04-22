import {ModristUser} from '../types'

const mockUser = {
  name: 'Mock User',
  userID: '0'
} as ModristUser

export function getUserInfo(userID: string): ModristUser {
  if (userID === '1'){
    return mockUser
  }
  return mockUser
}

export default getUserInfo