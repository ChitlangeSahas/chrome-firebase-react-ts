import React from 'react'
import {Button, Grid, TextField} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {useHistory} from 'react-router-dom'
import Box from '@material-ui/core/Box'
import {connect} from 'react-redux'
import UsersList from '../../User/UsersList'
import mockUsers from '../../mockData/mock'
import onClose from './actions'
import Page from '../Page'
import {AppState} from '../../Popup/reducers'

function PromptPage(): JSX.Element{
  const history = useHistory()

  const onBack = () => {
    history.goBack()
  }

  return (
    <Page>
      <Button onClick={onBack}>Back</Button>
      <Typography variant={'h4'}>
        From your Friday bullshit
      </Typography>

      <Typography variant={'h6'}>
        Do you have any notes for the attendees?
      </Typography>

      <UsersList userList={mockUsers} enableEdit={true}/>

      <TextField
        id="outlined-multiline-static"
        label="Meeting notes"
        multiline
        rows={3}
        variant="outlined"
      />

      <Grid>
        <Box>
          <Button onClick={onClose}>No</Button>
          <Button >Snooze</Button>
          <Button >Yes</Button>
        </Box>
      </Grid>
    </Page>
  )
}

const mstp = (state: AppState) => {

  return {state}
}

export default connect(mstp)(PromptPage)