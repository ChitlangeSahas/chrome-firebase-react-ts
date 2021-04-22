import SearchIcon from '@material-ui/icons/Search'
import {InputBase} from '@material-ui/core'
import React, {useContext} from 'react'
import {fade, makeStyles, Theme} from '@material-ui/core/styles'
import {getFireBaseContacts} from '../../User/getUserSearch'
import { UserContext } from '../../providers/UserProvider'

const useStyles = makeStyles((theme: Theme) => ({
    search: {
      position: 'relative',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      marginTop: 5,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
      borderBottom: '1px solid black'
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
}))

function SearchBar(props: {placeholder?: string}): JSX.Element {
  let inputValue = ''
  const classes = useStyles()
  const {placeholder} = props
  const {userEmail} = useContext(UserContext)


  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
    <InputBase
      placeholder={placeholder || 'Search my contacts'}
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
      inputProps={{ 'aria-label': 'search' }}
      onChange={e=>{
        inputValue = e.target.value
      }}
      onKeyPress={
        async (e) => {
          if (e.key === 'Enter') {
            // add function to update user list
            await getFireBaseContacts(userEmail, inputValue)
          }
        }
      }
    />
  </div>)
}

export default SearchBar