import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import {ModristUser} from './types'
import UserListItem from './UserListItem'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      overflow: 'auto',
      maxHeight: 400,
    },
  }),
)

const UsersList = (props: {userList: ModristUser[], enableEdit?: boolean}): JSX.Element => {
  const classes = useStyles()
  const {userList, enableEdit} = props

  const list =
    <List className={classes.root}>
    {userList.map((user, index) => {
      return (
        <span key={index}>
          <UserListItem user={user} key={index} enableEdit={enableEdit ?? false}/>
        </span>
      )
    })
    }
  </List>
  return list
}

export default UsersList

