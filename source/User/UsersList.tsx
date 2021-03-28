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
      overflow: 'auto',
      maxHeight: 400,
    },
  }),
)



const UsersList = (props: {userList: ModristUser[], enableEdit: boolean}): JSX.Element => {
  const classes = useStyles()
  const {userList, enableEdit} = props

  const list =
    <List className={classes.root}>
    {userList.map((user, index) => {
      return (
        <UserListItem user={user} key={index} enableEdit={enableEdit}/>
      )
    })
    }
  </List>
  return list
}

export default UsersList

