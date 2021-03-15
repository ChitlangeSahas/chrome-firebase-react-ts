import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyBbKvucFvSpzJ67MKqUVLR6IKSXr3S-H4o',
  authDomain: 'modrist.firebaseapp.com',
  projectId: 'modrist',
  storageBucket: 'modrist.appspot.com',
  messagingSenderId: '244497389215',
  appId: '1:244497389215:web:2e0fbd5f6b864df26574aa',
  measurementId: 'G-S8XSM0C1B4'
}

firebase.initializeApp(firebaseConfig)

console.log('Firebase config loaded')
export default firebase
