import React, {useContext} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import {Button, Grid} from '@material-ui/core'
import UsersList from '../../User/UsersList'
import SearchBar from '../SearchBar'
import onClose from '../PromptPage/actions'
import mockUsers from '../../mockData/mock'
import Page from '../Page'
import { UserContext } from '../../providers/UserProvider'
import firebase from 'firebase'
import {signInWithGoogle} from '../../firebase'



interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  }
}

function TabbedPage(): JSX.Element {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const {userName} = useContext(UserContext)
  const {userEmail} = useContext(UserContext)

  return (
    <Page>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="My contacts" {...a11yProps(0)} />
          <Tab label="My meetings" {...a11yProps(1)} />
          <Tab label="Save for later" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SearchBar/>
        <UsersList userList={mockUsers}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>

      <Grid>
        <Box>
          <Button onClick={onClose}>Close</Button>
          <Button >Go to Modrist</Button>
          <Button onClick={() => {
            firebase.auth().signOut()
            console.log('User logged out.')
          }}
          >
            Sign out
          </Button>
          <Button onClick={() => {
            signInWithGoogle()
          }}
          >
            Sign in with Google
          </Button>
        </Box>
      </Grid>
      <Typography variant={'h6'}>
        Display Name: {userName}
      </Typography>
      <Typography variant={'h6'}>
        Email: {userEmail}
      </Typography>

    </Page>
  )
}

export default TabbedPage