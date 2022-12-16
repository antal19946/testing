import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, ScrollView, Dimensions, BackHandler, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import Header from './Header';
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Notification = ({ navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum


    useEffect(() => {
        getUserType()
    }, [0])
    const [NotificationData, setNotification] = useState([])
    const [NotificationDataOld, setNotificationOld] = useState([])
    const [popup, setpopup] = useState(false)
    const [cdata, setcdata] = useState([])
    const getUserType = async () => {
        // setActivityIndicator(true)
        try {
            const user_id = await AsyncStorage.getItem("@MyApp_userId")
            const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
            fetch(`http://13.244.149.36:8080/user/notification/${user_id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": Mytoken,
                }
            })
                .then(res => res.json())
                .then(json => {
                    if (json.status === true) {
                        setcdata(json.result)
                        // let DataResult = []
                        // let DataResultOld = []
                        let DataResult = json.result.filter((item) => {
                            
                          return  +moment(item.createdAt).startOf('day') > +moment().startOf('day')-86400000
                                
                            
                        })
                      
                        setNotification(DataResult)
                        let DataResultOld = json.result.filter((item) => {
                            
                            return  +moment(item.createdAt).startOf('day') <= +moment().startOf('day')-86400000
                                  
                              
                          })
                        
                          setNotificationOld(DataResultOld)
                    }
                   


                    console.log(json)
                })


        } catch (e) {
            console.log('eror')
        }
    }



    const [details, setdetails] = useState()
    // const getIndex= key => event => {
    //   let data=(key)

    //   return(
    //   navigation.navigate('Accordion',{key:`${data}`}))
    // }

    useEffect(() => {
        const backAction = () => {
            navigation.goBack()
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [0]);
    const [heig, setheig] = useState(null)
    const [indexY, setindexY] = useState(null)


    const showMessage = key => async event => {
        setpopup(true)
        setindexY(key)
        const noti_id = [cdata[key]._id]
        const user_id = await AsyncStorage.getItem("@MyApp_userId")
        let items = { user_id: user_id, notification_id: noti_id, is_read: true }
        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
        fetch('http://13.244.149.36:8080/user/notification/is_read', {
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
                console.log('555555555555555555555555555555')
                console.log(json)
            })
        getUserType()
    }
    const cutPopup = ()=>{
        setpopup(false)
        getUserType()
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.containerMain}>
                    <Header Heading={i18n.t('Notifications')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />

                    {NotificationData && NotificationData.length > 0 && !popup && <ScrollView style={{ top: 20 }}>
                        <View style={{ marginBottom: 50, marginTop: 0 }}>
                            <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 20 }}>Today</Text>
                            {
                                NotificationData?.map((item, ind) => {
                                    return (
                                        <View key={ind}>
                                            {item?.is_read && <TouchableOpacity key={ind} style={styles.AnnouncementMain} onPress={showMessage(ind)}>
                                                <TouchableOpacity style={styles.TrainigIconMain} key={ind}>
                                                    <Image style={styles.TrainigIcon} source={require('../assets/askimage.png')} />
                                                </TouchableOpacity>

                                                <Text style={styles.AnnouncementHeading}>{item?.title}</Text>
                                                <Text style={styles.Datea}>{moment(item.createdAt).fromNow()}</Text>
                                                {/* {indexY === ind && <View style={{ width: '78%', right: 15, top: 10, position: 'absolute' }}><Text style={styles.msegTxt}>{item.message}</Text></View>} */}



                                            </TouchableOpacity>}
                                            {!item?.is_read && <TouchableOpacity key={ind} style={styles.AnnouncementMainNtRead} onPress={showMessage(ind)}>
                                                <TouchableOpacity style={styles.TrainigIconMain} key={ind}>
                                                    <Image style={styles.TrainigIcon} source={require('../assets/askimage.png')} />
                                                </TouchableOpacity>

                                                <Text style={styles.AnnouncementHeading}>{item?.title}</Text>
                                                {indexY != ind && <Text style={styles.Datea}>{moment(item.createdAt).fromNow()}</Text>}
                                                {/* {indexY === ind && <View style={{ width: '78%', right: 15, bottom: 10, position: 'absolute' }}><Text style={styles.msegTxt}>{item.message}</Text></View>} */}
                                                <View style={styles.notiNumMain}></View>


                                            </TouchableOpacity>}

                                        </View>

                                    )
                                })
                            }
                         {NotificationDataOld && NotificationDataOld.length>0 &&  <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 20, marginTop: 20 }}>Previous Notification</Text>}
                            {
                                NotificationDataOld?.map((item, ind) => {
                                    return (
                                        <View key={ind}>
                                            {item?.is_read && <TouchableOpacity key={ind} style={styles.AnnouncementMain} onPress={showMessage(ind+NotificationData.length)}>
                                                <TouchableOpacity style={styles.TrainigIconMain} key={ind}>
                                                    <Image style={styles.TrainigIcon} source={require('../assets/askimage.png')} />
                                                </TouchableOpacity>

                                                <Text style={styles.AnnouncementHeading}>{item?.title}</Text>
                                                <Text style={styles.Datea}>{moment(item.createdAt).fromNow()}</Text>
                                                {/* {indexY === ind && <View style={{ width: '78%', right: 15, bottom: 10, position: 'absolute' }}><Text style={styles.msegTxt}>{item.message}</Text></View>} */}



                                            </TouchableOpacity>}
                                            {!item?.is_read && <TouchableOpacity key={ind} style={styles.AnnouncementMainNtRead} onPress={showMessage(ind+NotificationData.length)}>
                                                <TouchableOpacity style={styles.TrainigIconMain} key={ind}>
                                                    <Image style={styles.TrainigIcon} source={require('../assets/askimage.png')} />
                                                </TouchableOpacity>

                                                <Text style={styles.AnnouncementHeading}>{item?.title}</Text>
                                                {indexY != ind && <Text style={styles.Datea}>{moment(item.createdAt).fromNow()}</Text>}
                                                {/* {indexY === ind && <View style={{ width: '78%', right: 15, bottom: 10, position: 'absolute' }}><Text style={styles.msegTxt}>{item.message}</Text></View>} */}
                                                <View style={styles.notiNumMain}></View>


                                            </TouchableOpacity>}

                                        </View>

                                    )
                                })
                            }

                        </View>
                    </ScrollView>}
                </View>
                {popup && <TouchableOpacity style={styles.popupContainer} onPress={cutPopup}>
                <TouchableOpacity style={{ backgroundColor: '#fff8f0', width: '95%', alignSelf: 'center', borderRadius: 10, top: 150 }}>

                    <View >


                        <View>
                            <View style={styles.AnnouncementMainPop}>
                                {/* <TouchableOpacity style={styles.cutBtn} onPress={()=>setpopup(false)}>
                            <Image style={styles.cutBtnImg} source={require('../assets/popupcutbtn.png')} />
                        </TouchableOpacity> */}
                                <Text style={styles.AnnouncementHeadingPop}>{cdata[indexY].title}</Text>
                                <ScrollView showsVerticalScrollIndicator={false}><Text style={styles.tariningDetails}>{cdata[indexY].message}</Text>
                                <Text style={styles.Dateapp}>{moment(cdata[indexY].createdAt).fromNow()}</Text>
                                </ScrollView>


                            </View>
                        </View>

                    </View>


                </TouchableOpacity>
            </TouchableOpacity>}
            </View>
        </SafeAreaView>
    )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'

    }, containerMain: {
        height: height - 50,
        width: '100%',
        overflow: 'hidden'
    },
    AnnouncementMain: {
        width: '90%',
        alignSelf: 'center',
        // height: 70,
        // backgroundColor:'#fff',
        marginVertical: 5,

        flexDirection: 'row',
        // justifyContent:'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    AnnouncementMainNtRead: {
        width: '90%',
        alignSelf: 'center',
        // height: 70,
        backgroundColor: '#fffcf8',
        marginVertical: 5,

        flexDirection: 'row',
        // justifyContent:'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },

    AnnouncementHeading: {
        fontSize: 14,
        fontWeight: '400',
        marginRight: 20,
        color: '#7c7c7c'
        // marginHorizontal:20,
        // marginVertical:10,
        // fontWeight:'600'

    },
    Datea: {
        fontSize: 12,
        marginLeft: 60,
        width: 100,
        // marginTop: 5,
        color: '#d98011',
        marginBottom:10
    },
    Dateapp:{
        fontSize: 12,
        position:'absolute',
        bottom:0,
        right:10,
        // marginLeft: 0,
        alignItems:'flex-end',
        justifyContent:'flex-end',
        // width: '100%',
        // marginTop: 5,
        color: '#d98011'
    },
    TrainigIconMain: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        margin: 10
        // position:'absolute',
        // left:0,
        // top:20
    },
    TrainigIcon: {
        width: '100%',
        height: '100%'
    },
    tariningDetails: {
        marginHorizontal: 10
    },
    TestBtn: {
        height: 38,
        width: 118,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7931e',
        borderRadius: 50,
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
    notiNumMain: {
        height: 20,
        width: 20,
        borderRadius: 50,
        backgroundColor: '#2b478b',
        position: 'absolute',
        top: -5,
        right: -5,
        // justifyContent:'center',
        // alignItems:'center'
    },
    popupContainer: {
        height: '100%',
        width: '100%',
        // backgroundColor:'red',
        position: 'absolute',
        // justifyContent:'center',
        // alignItems:'center'
    },
    cutBtn: {
        height: 20,
        width: 20,
        right: 20,
        position: 'absolute'
    },
    AnnouncementMainPop: {
        width: '95%',
        // height: 65,
        backgroundColor: '#fff8f0',
        marginVertical: 4,
        alignSelf: 'center',
        borderRadius: 10,
        // margin:5
        // justifyContent:'center',
        // alignItems:'center'
    },
    AnnouncementHeadingPop: {
        fontSize: 16,
        margin: 10,
        // height: 22,
        // flexWrap:'nowrap',
        fontWeight: '500',
        color: '#505050'
    },
})