import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
export default function ImagePickerExample(props) {
  const mynum = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  i18n.fallbacks = true;
  i18n.translations = { en, sw };
  i18n.locale = mynum



  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.imgPickerMain}>
      <TouchableOpacity style={styles.pickerBtn} onPress={props.StartCamera} >
        <Image style={styles.pickerLogo} source={require('../assets/imagepicker.png')} />
        <View style={styles.pickerBtnInner}>
          <Text style={styles.pickerTxt}>{i18n.t('Upload_image')}</Text>
          <Text style={styles.pickerTxts}>{i18n.t('Upload_image')}</Text>

          {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  imgPickerMain: {
    height: height / 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 10,
    backgroundColor: '#fffcf8',
    borderBottomColor: 'rgba(0,0,0,0.056)',
    borderBottomWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.046)',
    borderRightWidth: 0.8,
    borderLeftColor: 'rgba(0,0,0,0.046)',
    borderLeftWidth: 0.8,
    alignSelf: 'center',
    borderRadius: 10,
    // marginBottom:20
  },
  pickerBtn: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row'

  },
  pickerTxt: {
    fontSize: 14,
    color: '#414141',
    fontWeight: '900',
    margin: 10
  },
  pickerTxts: {
    fontSize: 12,
    color: '#414141',
    fontWeight: '300',
    marginHorizontal: 10
    // margin:10
  },
  pickerBtnInner: {
    height: '100%',
    width: '60%',
    right: 0,


  },
  pickerLogo: {
    marginHorizontal: 5,
    height: 50,
    width: 50
  }

})