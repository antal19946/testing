import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React,{useEffect,useState} from 'react'
import { ImageSlider } from "react-native-image-slider-banner";
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Slider = () => {
  useEffect(()=>{
    AllProduct()
  },[0])
  const [banner, setbanner] = useState([])
const AllProduct = async()=>{
  const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
  try {
      const value = await AsyncStorage.getItem('@usertype')
      
          fetch('http://13.244.149.36:8080/admin/banner/all',{
              method:'GET',
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "Authorization": Mytoken,
              }
          })
              .then(res => res.json())
              .then(json => {
               for(let i = 0;i<json.result.length;i++){
                let Data = json.result[i].photo
                setbanner((old)=>[...old,...Data])
                console.log('**************************************')
                console.log(banner)
               }
            
                  console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
                  console.log(json)
              })
      
   
  } catch (e) {
      console.log('eror')
  }
}
  return (
    <ImageSlider
      data={banner}
      autoPlay={true}

      closeIconColor="#fff"
      caroselImageContainerStyle={styles.imgStyle}
    />
  )
}

export default Slider

const styles = StyleSheet.create({
  imgStyle: {
    height: height * 1 / 7,
    width: 933,
    // marginHorizontal:5,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    // backgroundColor:'aqua'
  }
})