import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD6HLEazHLm8GBhcUXxn3CUDB4HWcXdA7k',
  authDomain: 'modristtemplatestorage.firebaseapp.com',
  databaseURL: 'https://modristtemplatestorage-default-rtdb.firebaseio.com',
  projectId: 'modristtemplatestorage',
  storageBucket: 'modristtemplatestorage.appspot.com',
  messagingSenderId: '549327487470',
  appId: '1:549327487470:web:b96abd0669a56015dc8eff',
  measurementId: 'G-KXQPME6BVH'
}

firebase.initializeApp(firebaseConfig)

console.log('Firebase config loaded')

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const signInWithGoogle = () => {
  chrome.identity.getAuthToken({'interactive':true},(token: string) => {
    if(chrome.runtime.lastError){
      console.log('It was not possible to get a token programmatically.')
    } else {
      // eslint-disable-next-line no-lonely-if
      if(chrome.runtime.lastError){
        console.error(chrome.runtime.lastError)
      } else if(token){
            const credential = firebase.auth.GoogleAuthProvider.credential(null, token)
            firebase.auth().signInWithCredential(credential).catch((error)=>{
              if(error.code === 'auth/invalid-credential'){
                chrome.identity.removeCachedAuthToken({token}, ()=>{
                  signInWithGoogle()
                })
              }
            })
      } else{
        console.error('The OAuth Token was null')
      }
    }
  })
}
export default firebase
