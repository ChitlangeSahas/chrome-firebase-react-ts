import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import {ModristUser} from './types'
import UserListItem from './UserListItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
)

const UsersList = (props: {userList: [ModristUser]}): JSX.Element => {
  const classes = useStyles()

  const list =
    <List className={classes.root}>
    {props.userList.map((user, index) => {
      return (
        <UserListItem name={user.name} key={index} />
      )
    })
    }
  </List>
  return list
}

export default UsersList

