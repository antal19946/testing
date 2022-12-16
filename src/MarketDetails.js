
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView,Alert, Dimensions,BackHandler,SafeAreaView,ImageBackground  } from 'react-native'
import React, { useState,useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';

import FilterSwitch from './FilterSwitch';
import Navbar from './Navbar';
import Header from './Header';
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const MarketDetails = ({ route, navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum

    useEffect(()=>{
        AllProduct()
    },[])

const AllProduct = async()=>{
    const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
    try {
        const value = await AsyncStorage.getItem('@usertype')
        
            fetch('http://13.244.149.36:8080/farmer/market/all',{
                method:'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": Mytoken,
                }
            })
                .then(res => res.json())
                .then(json => {
                    setProduct(json.result[myIndex])
                    console.log(Product)
                })
        
     
    } catch (e) {
        console.log('eror')
    }
}
const [Product, setProduct] = useState([])
const [ImgView, setImgView] = useState(false)
    const [Index, setIndex] = useState(0)
   
    const myIndex = route.params.key;
    const myData = route.params.MarketData;

    console.log(myIndex)
    console.log(myData)
    useEffect(() => {
        const backAction = () => {
         navigation.goBack()
          return true;
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () => backHandler.remove();
      }, [0]);
      const viewImgfunction = key=> event=>{
        setIndex(key)
        setImgView(true)
    }
    const Back = ()=>{
        if(Index>0){
            setIndex(Index-1)
        }else{
            setIndex(myData?.photo.length-1)
        }
    }
    const Next =()=>{
        if(Index<myData?.photo.length-1){
            setIndex(Index+1)
        }else{
            setIndex(0)
        }
    }
    const [My_Id, setMy_Id] = useState('')
    const getMyId = async()=>{
        const user_id = await AsyncStorage.getItem("@MyApp_userId")
        setMy_Id(user_id)
    }
    useEffect( ()=>{
        getMyId()
    },[route?.params?.MarketData])
    const deleteItem=async()=>{
       
       

        let items = { product_id: myData._id, }
        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
        fetch('http://13.244.149.36:8080/farm/market/delete', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": Mytoken,
            },
            body: JSON.stringify(items)
        })
            .then(res => res.json())
            .then(json => {
                console.log('999999999999999900000000000000000000000')
                console.log(json)
                if(json.status===true){
                    Alert.alert(
                        "HELLO!",
                        `${json.message}`,

                        [

                            { text: "OK", onPress: () =>navigation.navigate('Market',{isdeleted:json})  }
                        ]
                    );
                }else{
                    Alert.alert(
                        "HELLO!",
                        `${json.message}`,

                        [

                            { text: "OK", onPress: () =>navigation.navigate('Market',{isdeleted:json}) }
                        ]
                    );
                }
            })
         
    }
    return (
        <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <Header Heading={i18n.t('Commodity_market')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />
                {/* <FilterSwitch updateValue={(val)=>{
                    
                    // getUserType()
                    // setFilter(val);
                }} all={i18n.t('All_items')} allu={i18n.t('Recent')} allm={i18n.t('Old')} /> */}
                <ScrollView>
                    <View style={{marginTop:50}}>
                        <View key={myIndex} style={styles.AnnouncementMain}>
                         {myData.user_id ===My_Id &&   <TouchableOpacity style={styles.dltbtn} onPress={deleteItem}>
                            <AntDesign name="delete" size={24} color="black" />
                            </TouchableOpacity>}
                        
                            {/* <View style={styles.ModuleMain}>
                    <Text style={styles.Datea}>{`${myData[myIndex].submitTitle}`}</Text></View> */}
                            <Text style={styles.AnnouncementHeading}>{myData.title}</Text>
                            <Text style={styles.tariningDetails}>{myData.description}</Text>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            {myData?.photo[0] &&
                             myData?.photo.map((item,index)=>{
                                return(
                                    <TouchableOpacity key={index} onPress={viewImgfunction(index)}>
                                        <Image  style={styles.MarketImg} source={{ uri: item }} />
                                    </TouchableOpacity>
                                    
                                )
                            }) }
                           
                            </View>
                            <View style={styles.PriceMain}>
                                <TouchableOpacity style={styles.TestBtn}><Text style={styles.TestTxt}>{`Price ${myData.price_symbol} ${myData.price}`}</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />
            {ImgView && <View style={styles.photoContainer}>
    <ImageBackground style={styles.PhotoImg} resizeMode='center' source={{uri:myData?.photo[Index]}}>
    <TouchableOpacity style={styles.crossBtn}  onPress={()=>setImgView(false)}>
        <AntDesign name="closecircleo" size={35} color="black" />
            </TouchableOpacity>
        <View style={styles.NP_btn}>
        
            <TouchableOpacity  onPress={Back}>
            <AntDesign name="leftcircleo" size={40} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={Next}>
            <AntDesign name="rightcircleo" size={40} color="black" />
            </TouchableOpacity>
        </View>
    </ImageBackground>
</View>}
        </View>
        </SafeAreaView>
    )
}

export default MarketDetails

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    containerMain: {
        height: height - 150,
        width: '100%',
        overflow: 'hidden'
    },
    bgImg: {
        height: '100%',
        width: '100%',
    },

    AnnouncementMain: {
        width: '90%',
        // height:100,
        backgroundColor: '#fff8f0',
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 80,
        alignSelf: 'center'
        // margin:10,
        // justifyContent:'center',
        // alignItems:'center'
    },

    AnnouncementHeading: {
        fontSize: 16,
        marginBottom: 10,
        marginHorizontal: 10,
        // marginVertical:10,
        fontWeight: '600'

    },
    ModuleMain: {
        height: 21,
        width: 77,
        borderRadius: 50,
        backgroundColor: 'rgba(217, 127, 17, 0.01)',
        borderColor: 'rgba(217, 127, 17, 0.3)',
        borderWidth: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        left: 5,
        marginVertical: 10
    },
    Datea: {
        fontSize: 12,
        // marginHorizontal:30,
        // marginTop:10,
        color: '#d98011'
    },
    TrainigIconMain: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: 20
    },
    TrainigIcon: {
        width: '100%',
        height: '100%'
    },
    tariningDetails: {
        marginHorizontal: 10,
        color: '#505050',
        fontSize: 14,
        marginBottom: 20
    },
    PriceMain: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    TestBtn: {
        height: 38,
        width: 118,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2b478b',
        borderRadius: 50,
        // position:'absolute',
        // right:0,
        // bottom:0,
        // marginTop:50
        margin: 10
    },
    TestTxt: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700'
    },
    hideDetailBtn: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    MarketImg: {
        height: 60,
        width: 60,
        margin:5,
        borderRadius: 50
    },
    photoContainer:{
        height: height,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(46, 46, 46, 0.658)',
        top: 0
    },
    PhotoImg:{
        width:'100%',
        height:'90%',
        justifyContent:'center',
        alignItems:'center'
    },
    NP_btn:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'90%',
        alignSelf:'center'
    },
    crossBtn:{
        position:'absolute',
        top:20,
        right:10
        
    },
    dltbtn:{
        position:'absolute',
        top:0,
        right:0,
        height:50,
        width:50,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red'
    }


})