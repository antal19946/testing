import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View,BackHandler,Alert,SafeAreaView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { en, sw } from './Action/Store/Language';
import Navbar from './Navbar';
import Slider from './Slider';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const Dashboard = ({ route,navigation }) => {
    useEffect(() => {
        getUserType()
        console.log('12313123123123123')
    }, [route?.params?.isdeleted])
    const [ProfileData, setProfileData] = useState('')
    const getUserType = async () => {
        try {
            const user_id = await AsyncStorage.getItem("@MyApp_userId")
            const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
            fetch(`http://13.244.149.36:8080/user/profile/${user_id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": Mytoken,
                }
            })
                .then(res => res.json())
                .then(json => {
                    setProfileData(json.result)

                    console.log(json)
                })


        } catch (e) {
            console.log('eror')
        }
    }

    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum
    const data = [
        {
            Index: 1,
            functionA: 'Announcement',
            img: 'https://ingenioushitech.com/wp-content/uploads/2022/08/annnouncementttttttttttt.png',
            heading: i18n.t('Announcement'),
            BorderColor: '#fdedd8',
            BgColor: '#fff7ed'
        },
        {
            Index: 2,
            functionA: 'Trainig',
            img: 'https://ingenioushitech.com/wp-content/uploads/2022/08/training-hhhhhhhhhhh.png',
            heading: i18n.t('Training'),
            BorderColor: '#ffe5e5',
            BgColor: '#ffeded'
        },
        {
            Index: 3,
            functionA: 'Agronomist',
            img: 'https://ingenioushitech.com/wp-content/uploads/2022/08/agrommmmmmmmm.png',
            heading: i18n.t('Ask_and_agronomist'),
            BorderColor: '#f7fabf',
            BgColor: '#feffed'
        },
        {
            Index: 4,
            functionA: 'Weather',
            img: 'https://ingenioushitech.com/wp-content/uploads/2022/08/weatheryyyyyyyyyy.png',
            heading: i18n.t('Weather_update'),
            BorderColor: '#d6fdd2',
            BgColor: '#efffed'
        },
        {
            Index: 5,
            functionA: 'Market',
            img: 'https://ingenioushitech.com/wp-content/uploads/2022/08/mmmmmmm.png',
            heading: i18n.t('Commodity_market'),
            BorderColor: '#e0deff',
            BgColor: '#eeedff'
        },
        {
            Index: 6,
            functionA: 'FarmRecord',
            img: 'https://ingenioushitech.com/wp-content/uploads/2022/08/recordjjjjjjj.png',
            heading: i18n.t('Farm_Records'),
            BorderColor: '#efd1ff',
            BgColor: '#f9edff'
        },



    ]
    useEffect(() => {
        const backAction = () => {
          Alert.alert('Hold on!', 'Are you sure you want to go back?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            { text: 'YES', onPress: () => BackHandler.exitApp() },
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () => backHandler.remove();
      }, [0]);



          
    useEffect(()=>{
        getNotification()
    },[0])
const [NotificationData, setNotification] = useState(null)
    const getNotification = async () => {
        // setActivityIndicator(true)
        try {
            const user_id = await AsyncStorage.getItem("@MyApp_userId")
            const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
                fetch(`http://13.244.149.36:8080/user/notification/${user_id}`,{
                    method:'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": Mytoken,
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                       if(json.status===true){
                        setNotification(json.result)
                       }
                       
                       
                        // console.log(json)
                    })
            
          
        } catch (e) {
            console.log('eror')
        }
    }
    useEffect(()=>{
        if(NotificationData!==null){
        getCounting()
        
    }
    // getUserType()
    })
    const [len, setlen] = useState('')
    const getCounting = ()=>{
        let data =''
        if(NotificationData!==null){
            data = NotificationData.filter((data,index)=>{
                        return data.is_read===false
                    })
           
            setlen(data.length)
            // console.log(len)
           
        }
       
    }
    return (
       <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.containerMain}>
                    <View style={styles.headerMain}>
                        <View style={styles.headerHeadingMain}>
                            <View style={styles.headerBackIcon} >
                                <ImageBackground style={styles.profilePicture} imageStyle={{ borderRadius: 50 }} source={require('../assets/myprofile.png')}>
                                    {ProfileData?.photo && <Image style={{ height: '100%', width: '100%', borderRadius: 50 }} source={{ uri: ProfileData?.photo }} />}

                                </ImageBackground>
                            </View>
                            <Text style={styles.headerHeading}>{i18n.t('Welcome')}</Text>
                        </View>
                        <Text style={styles.headerTxt}>{ProfileData?.name}</Text>
                        <TouchableOpacity style={styles.notificationIcon} onPress={() => navigation.navigate('Notification')}>
                            <Ionicons name="notifications-outline" size={27} color="#fff" />
                            {len!==null &&<View style={styles.notiNumMain}><Text style={styles.lenTxt}>{len}</Text></View>}
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Slider />
                    </View>



                    <ScrollView style={{ top: 20 }} showsVerticalScrollIndicator={false}>
                        <View style={styles.contentMain}>
                            {
                                data.map((item, ind) => {
                                    return (
                                        <TouchableOpacity key={ind} style={[styles.rectangle, { borderColor: item.BorderColor, backgroundColor: item.BgColor }]} onPress={() => navigation.navigate(item.functionA)}>
                                            <Image style={styles.contentImg} source={{ uri: item.img }} />
                                            <View style={styles.headingMain}><Text style={styles.Heading}>{item.heading}</Text></View>
                                        </TouchableOpacity>
                                    )
                                })
                            }</View>
                        <View style={{ height: 30 }}></View>
                    </ScrollView>




                </View>
                <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />

            </View>
            </SafeAreaView>
        

    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        // flex:2,
        alignItems: 'center',
        backgroundColor: '#fff'

    },
    containerMain: {
        height: height - 150,
        width: '100%',
        overflow: 'hidden'
    },
    headerMain: {
        width: '100%',
        height: 86,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fca237'

    },
    headerHeadingMain: {
        width: '90%',
        height: 60,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 20

    },
    headerHeading: {
        fontSize: 18,
        color: '#fff', marginHorizontal: 10,
        marginVertical: 5,
        fontWeight: 'bold'

    },
    Heading: {
        textAlign: 'center',
        fontSize: height / 57,
        fontWeight: '700',
    },

    profilePicture: {
        height: 50,
        width: 50,
        borderRadius: 50,
        left: 5
    },
    headerTxt: {
        fontSize: 16,
        color: '#fff',
        left: 70,
        marginTop: 10,

        position: 'absolute',
        bottom: 15
    },
    contentMain: {
        width: '100%',
        // height:'100%',
        // alignSelf:'center',
        // top:70,
        // position:'absolute',
        justifyContent: 'space-evenly',
        alignContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5
        // marginBottom:50
        // backgroundColor:'aqua'
    },
    rectangle: {
        height: 140,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor:'#fca237',
        borderWidth: 1,
        borderRadius: 10,
        // marginHorizontal:10,
        marginVertical: 10,
        // marginHorizontal:10
        // marginVertical:15

    },
    contentImg: {
        height: 80,
        width: 80,
    },
    notificationIcon: {
        position: 'absolute',
        right: 30,
        top: 35
    },
    notiNumMain:{
        height:20,
        width:20,
        borderRadius:50,
        backgroundColor:'#2b478b',
        position:'absolute',
        top:-5,
        right:-5,
        // justifyContent:'center',
        // alignItems:'center'
    },
    lenTxt:{
        color:'#fff',
        textAlign:'center',
        // fontSize:15,
        
    }


})