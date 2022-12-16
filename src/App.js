import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Appwraper from './Appwraper'
import { Provider } from 'react-redux'
import Store from './Action/Store/Store'


const App = () => {
  return (
    <Provider store={Store}>
      <Appwraper />

    </Provider>


  )
}

export default App

const styles = StyleSheet.create({})