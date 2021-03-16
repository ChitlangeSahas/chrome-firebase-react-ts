import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import {ModristUser} from './types'
import {ListItem} from '@material-ui/core'

const UserListItem = ({name}: ModristUser): JSX.Element => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={'description'} />
    </ListItem>
  )
}

export default UserListItem