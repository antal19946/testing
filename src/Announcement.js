import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Image,BackHandler,SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import FilterSwitch from './FilterSwitch';
import Navbar from './Navbar';
import Header from './Header';
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Announcement = ({ navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum
    const [popup, setpopup] = useState(false)
    const [cdata, setCdata] = useState([])
    const [filter, setFilter] = useState('')
    useEffect(() => {
        getUserType()

    }, [getUserType])
    // console.log(cdata)
    // console.log(filter.cat_name)
    const dateZone = () => {
        cdata.map((item, ind) => {
            return item.createdAt
        })
    }
    const getUserType = async () => {
        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
        try {
            const value = await AsyncStorage.getItem('@usertype')
            if (value === 'farmer') {
                fetch('http://13.244.149.36:8080/farmer/annoucement/all', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": Mytoken,
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                       
                            setCdata(json.result)
                        
                        // setCdata(json.result)
                        // console.log('farmer')
                    })
            }
            else if (value === 'cooperative') {
                fetch('http://13.244.149.36:8080/member/annoucement/all', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": Mytoken,
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        
                            setCdata(json.result)
                        

                    })
            }
            else {
                console.log('first')
            }
        } catch (e) {
            console.log('eror')
        }
    }
    const [Key, setKey] = useState()

    const getind = key => event => {
        setKey(key)
        setpopup(true)

    }
    useEffect(() => {
        const backAction = () => {
         navigation.goBack()
          return true;
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () => backHandler.remove();
      }, [0]);
      const getCall=(val)=>{
        if(val.cat_name==='All Items'||val.cat_name==='matangazo yote'){
            const getUserTypeAll = async () => {
                const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
                try {
                    const value = await AsyncStorage.getItem('@usertype')
                    if (value === 'farmer') {
                        fetch('http://13.244.149.36:8080/farmer/annoucement/all', {
                            method: 'GET',
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": Mytoken,
                            }
                        })
                            .then(res => res.json())
                            .then(json => {
                               
                                    setCdata(json.result)
                                
                                // setCdata(json.result)
                                // console.log('farmer')
                            })
                    }
                    else if (value === 'cooperative') {
                        fetch('http://13.244.149.36:8080/member/annoucement/all', {
                            method: 'GET',
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": Mytoken,
                            }
                        })
                            .then(res => res.json())
                            .then(json => {
                                
                                    setCdata(json.result)
                                
        
                            })
                    }
                    else {
                        console.log('first')
                    }
                } catch (e) {
                    console.log('eror')
                }
            }
            getUserTypeAll()
        }else if(val.cat_name==='Recent'||val.cat_name==='Hivi karibuni'){
            const getUserTypeRecent = async () => {
                const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
                try {
                    const value = await AsyncStorage.getItem('@usertype')
                    if (value === 'farmer') {
                        fetch('http://13.244.149.36:8080/farmer/annoucement/all', {
                            method: 'GET',
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": Mytoken,
                            }
                        })
                            .then(res => res.json())
                            .then(async (json) => {
                                if (json.status === true) {
                                    
                                    let DataResultOld = []
                                    let DataResult = json.result.filter((item) => {
                                        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                                        console.log( new Date(item.createdAt))
                                      return  +moment(item.createdAt).startOf('day') > +moment().startOf('day') -86400000*3
                                            
                                        
                                    })
                                    setCdata(DataResult)
                                }
                                    
                                
                                // setCdata(json.result)
                                // console.log('farmer')
                            })
                    }
                    else if (value === 'cooperative') {
                        fetch('http://13.244.149.36:8080/member/annoucement/all', {
                            method: 'GET',
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": Mytoken,
                            }
                        })
                            .then(res => res.json())
                            .then(async (json) => {
                                if (json.status === true) {
                                    
                                    let DataResultOld = []
                                    let DataResult = json.result.filter((item) => {
                                        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                                        console.log( new Date(item.createdAt))
                                      return  +moment(item.createdAt).startOf('day') > +moment().startOf('day') -86400000*3
                                            
                                        
                                    })
                                    setCdata(DataResult)
                                }
        
                            })
                    }
                    else {
                        console.log('first')
                    }
                } catch (e) {
                    console.log('eror')
                }
            }
            getUserTypeRecent()
        }else if(val.cat_name==='Old'||val.cat_name==='Ya zamani'){
             const getUserTypeOld = async () => {
                const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
                try {
                    const value = await AsyncStorage.getItem('@usertype')
                    if (value === 'farmer') {
                        fetch('http://13.244.149.36:8080/farmer/annoucement/all', {
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
                                    
                                    let DataResultOld = []
                                    let DataResult = json.result.filter((item) => {
                                        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                                        console.log( new Date(item.createdAt))
                                      return  +moment(item.createdAt).startOf('day') < +moment().startOf('day') -86400000*5
                                            
                                        
                                    })
                                    setCdata(DataResult)
                                }
                            })
                    }
                    else if (value === 'cooperative') {
                        fetch('http://13.244.149.36:8080/member/annoucement/all', {
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
                                    
                                    let DataResultOld = []
                                    let DataResult = json.result.filter((item) => {
                                        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                                        console.log( new Date(item.createdAt))
                                      return  +moment(item.createdAt).startOf('day') < +moment().startOf('day') -86400000*5
                                            
                                        
                                    })
                                    setCdata(DataResult)
                                }
                            })
                    }
                    else {
                        console.log('first')
                    }
                } catch (e) {
                    console.log('eror')
                }
            }
            getUserTypeOld()
        }
      }
    return (
        <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <Header Heading={i18n.t('Announcement')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />
                {!popup && <View><FilterSwitch updateValue={(val)=>getCall(val)} all={i18n.t('All_items')} allu={i18n.t('Recent')} allm={i18n.t('Old')} />
                    <ScrollView>
                        <View style={{ marginBottom: 180 }}>
                            {
                                cdata?.map((item, ind) => {
                                    return (
                                        <TouchableOpacity key={ind} style={styles.AnnouncementMain} onPress={getind(ind)}>

                                            <Text style={styles.AnnouncementHeading}>{item.title}</Text>


                                            <Text style={styles.Datea}>{moment(item.createdAt).fromNow()}</Text>

                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView></View>}
            </View>
            <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />
            {popup && <TouchableOpacity style={styles.popupContainer} onPress={() => setpopup(false)}>
                <TouchableOpacity style={{ backgroundColor: '#fff8f0', width: '95%', alignSelf: 'center', borderRadius: 10, top: 150 }}>

                    <View >


                        <View>
                            <View style={styles.AnnouncementMainPop}>
                                {/* <TouchableOpacity style={styles.cutBtn} onPress={()=>setpopup(false)}>
                            <Image style={styles.cutBtnImg} source={require('../assets/popupcutbtn.png')} />
                        </TouchableOpacity> */}
                                <Text style={styles.AnnouncementHeadingPop}>{cdata[Key].title}</Text>
                                <ScrollView showsVerticalScrollIndicator={false}><Text style={styles.tariningDetails}>{cdata[Key].description}</Text></ScrollView>


                            </View>
                        </View>

                    </View>


                </TouchableOpacity>
            </TouchableOpacity>}
        </View>
        </SafeAreaView>
    )
}

export default Announcement

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
        width: '95%',
        height: 65,
        backgroundColor: '#fff8f0',
        marginVertical: 4,
        alignSelf: 'center',
        borderRadius: 10,
        // margin:5
        // justifyContent:'center',
        // alignItems:'center'
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


    AnnouncementHeading: {
        fontSize: 16,
        margin: 10,
        height: 22,
        // flexWrap:'nowrap',
        fontWeight: '500',
        color: '#505050'

    },
    AnnouncementHeadingPop: {
        fontSize: 16,
        margin: 10,
        // height: 22,
        // flexWrap:'nowrap',
        fontWeight: '500',
        color: '#505050'
    },
    Datea: {
        fontSize: 12,
        marginHorizontal: 20,
        color: '#a2a2a2'
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
})