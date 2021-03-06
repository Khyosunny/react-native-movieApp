import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import StackNavigator from './src/navigation'
import rootReducer from './src/common'

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  )
}
