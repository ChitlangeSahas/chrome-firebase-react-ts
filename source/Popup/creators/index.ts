import {ModristUser} from '../../User/types'

export type Action =
  | ReturnType<typeof createUser>


export const CREATE_USER = 'CREATE_USER'

export const createUser = (user: ModristUser) =>
  ({
    type: CREATE_USER,
    user,
  } as const)