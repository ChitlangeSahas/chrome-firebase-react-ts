import firebase, {firestore} from '../firebase'

export interface MeetingObj{
  title: string,
  meetingId: string,
  updated: string,
  attendees: string[],
  start: string,
  end: string
}

function addDays(date: string | number | Date, days: number) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export async function getCalendar(userEmail: string): Promise<string> {
  const jsonMeetings: any[] = []
  return new Promise(()=> {
    chrome.identity.getAuthToken({'interactive': true}, (token: string) => {
      const headers = new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
      const queryParams = {headers}
      const timeMin = new Date()
      const timeMax = addDays(timeMin, 7)
        fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin.toISOString()}&timeMax=${timeMax.toISOString()}`,
          queryParams)
          .then((response) => response.json())
          .then((data) => {
            console.log('data:\n', data)
            /* const obj = JSON.parse(data)
            console.log('obj\n', obj) */
            const events = data.items

            if (events.length) {
              console.log('Upcoming events:')
              for (const event of events) {
                if (event.attendees && event.start.dateTime) {
                  // meeting object to push to JSON
                  const meeting: MeetingObj = {
                    title: event.summary,
                    meetingId: event.etag,
                    updated: event.updated,
                    attendees: [],
                    start: '',
                    end: ''
                  }
                  // empty array to push attendees into
                  const users = []
                  console.log(event.summary)
                  for (const attendee of event.attendees) {
                    users.push(attendee.email)
                  }
                  // assign attendees array to meeting object
                  Object.assign(meeting, {attendees: users})

                  // extract start and end times to push into object
                  if (event.start.dateTime) {
                    meeting.start = event.start.dateTime
                    meeting.end = event.end.dateTime
                  }
                  jsonMeetings.push(meeting)
                  firestore.collection(`/Users/${userEmail}/Meetings`).doc(meeting.meetingId).set({
                    title: meeting.title,
                    meetingId: meeting.meetingId,
                    updated: new Date(meeting.updated),
                    attendees: meeting.attendees,
                    start: new Date(meeting.start),
                    end: new Date(meeting.end),
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    note: ''
                  })
                  }
                }
              }
             else {
              console.log('No upcoming events found.')
             }
            return JSON.stringify(jsonMeetings)
          })
    })
  })
}