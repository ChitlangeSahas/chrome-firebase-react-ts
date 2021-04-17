import firebase, {firestore} from '../firebase'


export async function getContacts(userEmail: string){
  chrome.identity.getAuthToken({'interactive': true}, async (token: string) => {
    const headers = new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    })
    let syncToken = ''
    const doc = await firestore.collection(`/Users/${userEmail}/Tokens`).doc('googlePeople').get()
    if(doc.exists){
      const syncTokenObj = doc.data()
      console.log('syncTokenObj:', syncTokenObj)
      if(syncTokenObj){
        syncToken = `&syncToken=${syncTokenObj.contactSyncToken}`
      }
    }
    const queryParams = {headers}
    fetch(`https://people.googleapis.com/v1/people/me/connections?requestSyncToken=true${syncToken}&personFields=emailAddresses,events,names,organizations,occupations,phoneNumbers`,
      queryParams)
      .then((response) => response.json())
      .then((data) => {
        console.log('contacts data:', data)
        const newSyncToken = data.nextSyncToken
        if(data.connections){
          for (const contact of data.connections){
            firestore.collection(`/Users/${userEmail}/Contacts`).doc(contact.emailAddresses[0].value).set({
              name: contact.names[0].displayName,
              organization: contact.organizations[0].name,
              occupation: contact.organizations[0].title,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              note: ''
            })
          }
        }
        firestore.collection(`/Users/${userEmail}/Tokens`).doc('googlePeople').set({
          contactSyncToken: newSyncToken,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      })
  })
}