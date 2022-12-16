import DateTimePicker from '@react-native-community/datetimepicker'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Button } from 'react-native'
import React, { useState } from 'react'


export const DateSelector = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selected, setselected] = useState(true)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setselected(false)


  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  let data = date.toLocaleString();
  let daa = data.split(' ')
  console.log(`${daa[0]} ${daa[2]} ${daa[1]} ${daa[4]}`)
  //   console.log(data)
  return (
    <View>

      <TouchableOpacity style={styles.inputMain} onPress={showDatepicker}>
        <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/Projectlogo.png')} /></View>
        <View style={styles.inputTxtMain}>
          <Text style={styles.inputHeading}>Date</Text>
          {selected && <Text style={styles.input}>Select Date</Text>}
          {!selected && <Text>selected: {`${daa[0]} ${daa[2]} ${daa[1]} ${daa[4]}`}</Text>}
        </View>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  inputMain: {
    width: '90%',
    height: 70,
    backgroundColor: '#fff',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    borderRadius: 10,
    marginVertical: 10

  },
  inputTxtMain: {
    width: '80%',
    height: '100%',
    // justifyContent:'center',
    // backgroundColor:'aqua',
    // alignItems:'center'
  },
  inputHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    height: '40%',
    marginTop: 10
  },
  input: {
    width: '80%',
    height: '50%',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',

  },
  formImg: {
    height: 60,
    width: 60,

    alignItems: 'center'
  },
  formImgMain: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
})