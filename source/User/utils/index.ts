import {ModristUser} from '../types'

const mockUser = {
  name: 'Mock User',
  userID: 0
} as ModristUser

export function getUserInfo(userID: number): ModristUser {
  return mockUser
}

export default getUserInfo