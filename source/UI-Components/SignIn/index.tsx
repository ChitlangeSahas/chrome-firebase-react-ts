// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import {Button} from '@material-ui/core'
import onClose from '../PromptPage/actions'
import Page from '../Page'
import {signInWithGoogle} from '../../firebase'

// currently unused

function SignIn() {
  console.log('attempting to sign in')
  return (
    <Page>
      <Button onClick={() => {
                signInWithGoogle()
              }}
      >
        Sign in with Google
      </Button>
      <Button onClick={onClose}>Close</Button>
    </Page>

  )
}
export default SignIn