import React from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: '30rem'
  }
}))

function Page(props: {title?: string, children: JSX.Element[]}): JSX.Element {
  const classes = useStyles()
  const {children} = props
  return (
    <div className={classes.root}>
      {children}
    </div>
  )
}

export default Page