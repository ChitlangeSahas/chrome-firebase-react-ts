import React, {useState} from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import {Collapse, ListItem, ListItemSecondaryAction, TextField} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import {ModristUser} from './types'

const UserListItem = (props: {user: ModristUser, enableEdit?: boolean}): JSX.Element => {
  const {user : {name, userID}, enableEdit} = props
  const [showUserNotes, setShowUserNotes] = useState(false)
  const history = useHistory()

  const handleClick = () => {
    console.log('Routing...')
      history.push(`/user/${userID}`)
  }
  return (
    <>
      <ListItem onClick={handleClick} button>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={'example@email.com'} />
        {enableEdit &&
        <ListItemSecondaryAction>
          <IconButton onClick={() => {
            // Todo: implement onclick behavior here
            setShowUserNotes(!showUserNotes)
          }}>
            <EditIcon/>
          </IconButton>
        </ListItemSecondaryAction>
        }
      </ListItem>
      <Collapse in={showUserNotes}>
        <TextField
          id="outlined-multiline-static"
          label=""
          multiline
          rows={3}
          variant="outlined"
        />
      </Collapse>
    </>

  )
}

export default UserListItem