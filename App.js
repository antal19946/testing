import { StyleSheet, Text, View } from 'react-native'

import React from 'react'
import Appwraper from './src/Appwraper'
import store from './src/Action/Store/Store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
       <Appwraper/>
   
    </Provider>
     
  )
}

export default App

const styles = StyleSheet.create({})