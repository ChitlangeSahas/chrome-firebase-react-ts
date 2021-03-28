import React from 'react'
import {Button} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {useHistory} from 'react-router-dom'
import UsersList from '../../User/UsersList'
import mockUsers from '../../mockData/mock'

function Page(): JSX.Element{
  const history = useHistory()

  const onBack = () => {
    history.goBack()
  }

  return (
    <>
      <Button onClick={onBack}>Back</Button>
      <Typography variant={'h4'}>
        From your Friday bullshit
      </Typography>

      <Typography variant={'h6'}>
        Individual Notes:
      </Typography>

      <UsersList userList={mockUsers} enableEdit={true}/>
    </>
  )
}

export default Page