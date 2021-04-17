import {browser} from 'webextension-polyfill-ts'
import firebase, {firestore} from '../firebase'
import {getCalendar} from './getcalendar'
import {getContacts} from './getcontacts'

function scheduleRequest() {
  console.log('schedule refresh alarm to 30 minutes...')
  chrome.alarms.create('refresh', { periodInMinutes: 30 })
}

function scheduleWatchdog() {
  console.log('schedule watchdog alarm to 5 minutes...')
  chrome.alarms.create('watchdog', { periodInMinutes: 5 })
}

async function startRequest() {
  chrome.identity.getProfileUserInfo(async userInfo => {
    const userEmail = userInfo.email
    console.log('User is', userEmail)
    if(userEmail != null) {
      console.log('Pushing test data for', userEmail)
      await firestore.collection('test1').add({
        user: userEmail,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      await getContacts(userEmail)
      await getCalendar(userEmail)


    }
  })
}

browser.runtime.onInstalled.addListener((): void => {
  console.log('🦄', 'extension installed')
  scheduleRequest()
  scheduleWatchdog()
  startRequest()
})

/* chrome.runtime.sendMessage({command: 'update contacts', collection: 'contacts', data: {name: 'user'}}, (msg) =>{
  console.log('response', msg)
})

chrome.runtime.onMessage.addListener((msg, sender, response) =>{
  if (msg.command === 'update contacts'){
    console.log('updating contacts', sender, response)
    firestore.collection(msg.)
  }
})
*/
// every 15 min
/*
window.setInterval(()=>{
  console.log('Hello world')
}, 1000*60*15)
*/
chrome.alarms.onAlarm.addListener(() => {
  console.log('Hello, world!')
})

chrome.alarms.onAlarm.addListener(alarm => {
  // if watchdog is triggered, check whether refresh alarm is there
  if (alarm && alarm.name === 'watchdog') {
    chrome.alarms.get('refresh', alarm1 => {
      if (alarm1) {
        console.log('Refresh alarm exists. Yay.')
      } else {
        // if it is not there, start a new request and reschedule refresh alarm
        console.log('Refresh alarm doesn\'t exist, starting a new one')
        startRequest()
        scheduleRequest()
      }
    })
  } else {
    // if refresh alarm triggered, start a new request
    startRequest()
  }
})