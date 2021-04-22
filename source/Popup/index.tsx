import * as React from 'react'
import ReactDOM from 'react-dom'


import { createStore } from 'redux'
import {Provider} from 'react-redux'
import Popup from './Popup'
import appReducer from './reducers'

const store = createStore(appReducer)

ReactDOM.render(
  <Provider store={store}><Popup /></Provider>, document.getElementById('popup-root'))
