import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image,ImageBackground,BackHandler } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons'; 


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
export default function CameraStart() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [image, setImage] = useState(null);
  const ref = useRef(null);
  const [photo, setphoto] = useState(null)
  const [groupphoto, setGroupphoto] = useState([])

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }







  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const tekePicturec = async () => {
    const photo1 = await ref.current.takePictureAsync();
    setphoto(photo1.uri)
    if (groupphoto.length < 5) {
      setGroupphoto((oldPhoto) => {
        return ([...oldPhoto, photo])
      })
    }

  }
  useEffect(() => {
    const backAction = () => {
     navigation.goBack()
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [0]);
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity><Text>Done</Text></TouchableOpacity> */}
      <Camera style={styles.camera} type={type} ref={ref}>
        <View style={styles.buttonContainer}>

        </View>
      </Camera>
      <View style={styles.cameraOptionMain}>
        <TouchableOpacity style={styles.imagePickerBtn}>
        {photo &&  <ImageBackground style={styles.imagePickerBtn} source={{uri:photo}}>
        <AntDesign name="checkcircle" size={35} color="rgba(228, 225, 225, 0.911)" />
        </ImageBackground>}
        </TouchableOpacity>
        <View style={styles.takePictureBtnMain}>
          <TouchableOpacity style={styles.takePicture} onPress={tekePicturec}>
          <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>{groupphoto.length}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity

          onPress={() => {
            setType(type === CameraType.back ? CameraType.front : CameraType.back);
          }}>
          <ImageBackground style={styles.flipBtn} source={require('../assets/flipcamera.png')}>
           
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff8f0'
  },
  camera: {
    height: width * 1.33333, width: width
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  cameraOptionMain: {
    width: '100%',
    height: 70,

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10

  },
  takePictureBtnMain: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  takePicture: {
    height: 55,
    width: 55,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent:'center'
  },
  flipBtn: {
    height: 50,
    width: 50,
    marginRight: 20
  },
  imagePickerBtn: {
    height: 40,
    width: 40,
    marginLeft: 20,
    justifyContent:'center',
    alignItems:'center'

  }
});
