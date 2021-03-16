import React from 'react'
import {ModristUser} from './types'
import getUserInfo from './utils'

const UserInfoPage = ({userID}: ModristUser): JSX.Element => {
  const currentUser = getUserInfo(userID)
  return (
    <>
    {currentUser.userID}
    {currentUser.name}
    </>
  )
}

export default UserInfoPage