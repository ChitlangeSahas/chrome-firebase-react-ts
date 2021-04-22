import {firestore} from '../firebase'
import {ModristUser} from './types'

// eslint-disable-next-line prefer-const,import/no-mutable-exports
let ContactList = [{name: '',userID: ''}] as ModristUser[]

export async function getFireBaseContacts(userEmail: string | null, searchInput: string){
  await firestore.collection(
    `/Users/${userEmail}/Contacts`)
    .where('name', '>=', searchInput).where('name', '<=', `${searchInput }~`)
    .get().then((snapshot)=>{
      if(snapshot.empty){
        console.log('No match on name search.')
      }
      else{
        ContactList.pop()
        snapshot.forEach(doc =>{
          console.log(doc.id, '=>', doc.data().name)
          ContactList.push({
            name: doc.data().name,
            userID: doc.id
          })
        })
      }
    }
    )
  await firestore.collection(
    `/Users/${userEmail}/Contacts`)
    .where('__name__', '>=', searchInput).where('__name__', '<=', `${searchInput }~`)
    .get().then((snapshot)=>{
      if(snapshot.empty){
        console.log('No match on id search.')
      }
      else{
        ContactList.pop()
        snapshot.forEach(doc =>{
          console.log(doc.id, '=>', doc.data().name)
          ContactList.push({
            name: doc.data().name,
            userID: doc.id
          })
        })
      }
    })
}

export default ContactList