import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Copy = () => {
  const [first, setfirst] = useState([
    { cat_id: 0, cat_name: 'All Item', backgroundcolor: '#2b478b', Fcolor: '#fff' },
    { cat_id: 1, cat_name: 'Recent', backgroundcolor: '#fff', Fcolor: '#7c7c7c' },
    { cat_id: 2, cat_name: 'Old', backgroundcolor: '#fff', Fcolor: '#7c7c7c' },

  ])

  const changeBackground = key => event => {
    console.log(key)

    for (let x = 0; x < first.length; x++) {
      if (first[x].cat_id === key) {
        first[x].backgroundcolor = '#2b478b';
        first[x].Fcolor = '#fff';


      } else {
        first[x].backgroundcolor = '#fff';
        first[x].Fcolor = '#7c7c7c';


      }
    }
  };
  return (
    <View style={styles.switchMain}>
      {first.map((item, ind) => (
        <TouchableOpacity
          key={ind}
          style={{
            width: '33%',
            height: 39,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            backgroundColor: item.backgroundcolor,
          }}
          onPress={changeBackground(ind)}>
          <Text style={{ color: item.Fcolor, fontWeight: '500', fontSize: 16 }}>
            {' '}
            {item.cat_name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default Copy

const styles = StyleSheet.create({
  switchMain: {
    width: '90%',
    height: 40,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10


  },
  allItem: {
    widt: '33%',
    height: 39,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50

  }
})