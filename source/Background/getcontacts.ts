import firebase, {firestore} from '../firebase'


export function getContacts(userEmail: string){
  chrome.identity.getAuthToken({'interactive': true}, (token: string) => {
    const headers = new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    })
    console.log(userEmail)
    const queryParams = {headers}
    fetch('https://people.googleapis.com/v1/people/me/connections?requestSyncToken=true&personFields=emailAddresses,events,names,organizations,occupations,phoneNumbers',
      queryParams)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const syncToken = data.nextSyncToken
        for (const contact of data.connections){
          firestore.collection(`/Users/${userEmail}/Contacts`).doc(contact.emailAddresses[0].value).set({
            name: contact.names[0].displayName,
            organization: contact.organizations[0].name,
            occupation: contact.organizations[0].title,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            note: ''
          })
        }
        firestore.collection(`/Users/${userEmail}/Tokens`).doc('googlePeople').set({
          contactSyncToken: syncToken,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      })
  })
}