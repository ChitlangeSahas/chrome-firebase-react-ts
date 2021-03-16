import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import {ListItem} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import {ModristUser} from './types'

const UserListItem = (props: {user: ModristUser}): JSX.Element => {
  const {user : {name, userID}} = props
  const history = useHistory()

  const handleClick = () => {
    console.log('Routing...')
      history.push(`/user/${userID}`)
  }
  return (
    <ListItem onClick={handleClick} button>
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