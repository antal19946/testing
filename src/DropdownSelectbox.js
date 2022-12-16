import { StyleSheet, Text, View, TouchableOpacity, Image, Switch, TextInput } from 'react-native'
import React, { useState } from 'react';


import { Picker } from '@react-native-picker/picker';
function DropdownSelectbox() {
  const [selectedLanguage, setSelectedLanguage] = useState();

  console.log(selectedLanguage)
  return (
    <Picker
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) =>
        setSelectedLanguage(itemValue)
      }>
      <Picker.Item label="Male" value="Male" />
      <Picker.Item label="Female" value="Femail" />
    </Picker>
  );
}
export default DropdownSelectbox;