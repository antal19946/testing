
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions,BackHandler,SafeAreaView,ImageBackground  } from 'react-native'
import React, { useState,useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';

import FilterSwitch from './FilterSwitch';
import Navbar from './Navbar';
import Header from './Header';
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Myquastion = ({ route, navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum
    const indexY = route.params.index;
    const value = route.params.value;
    console.log(value)
    useEffect(()=>{
        getCall()
    },[route.params.index])
const [Data, setData] = useState([])
const [ImgView, setImgView] = useState(false)
    const getCall= async()=>{
        if(value?.cat_name==='Other Questions' || value?.cat_name === 'Maswali mengine'){
            const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
        fetch('http://13.244.149.36:8080/query/all', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": Mytoken,
            }
        })
            .then(res => res.json())
            .then(json => {
                setData(json.result)
                console.log('0000011111111111111111111111111')
                console.log(json)
            })
        }else{
            const userId = await AsyncStorage.getItem("@MyApp_userId")
            const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
            
            
                fetch(`http://13.244.149.36:8080/farm/queries/${userId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": Mytoken,
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        setData(json.result)
                        console.log(json)
                    })
    
    
            
        }
    }
    const viewImgfunction = key=> event=>{
        setIndex(key)
        setImgView(true)
    }
    const Back = ()=>{
        if(Index>0){
            setIndex(Index-1)
        }else{
            setIndex(Data[indexY]?.photo.length-1)
        }
    }
    const [Index, setIndex] = useState(0)
    const Next =()=>{
        if(Index<Data[indexY]?.photo.length-1){
            setIndex(Index+1)
        }else{
            setIndex(0)
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
        <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <Header Heading={i18n.t('My_questions')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />

                <ScrollView style={{ top: 50 }}>
                    <View style={{ marginBottom: 50 }}>
                        <View  style={styles.AnnouncementMain}>
                            {/* <View style={{ width: '100%', alignItems: 'flex-end' }}><Text style={styles.Datea}>{`${i18n.t('You_have_10_answers')}`}</Text></View> */}
                            <View style={{ backgroundColor: '#fff8f0', width: '90%', alignSelf: 'center', borderRadius: 10 }}><Text style={styles.AnnouncementHeading}>{Data[indexY]?.question}</Text>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                                        {Data[indexY]?.photo[0] &&
                             Data[indexY]?.photo.map((item,index)=>{
                                return(
                                    <TouchableOpacity key={index} onPress={viewImgfunction(index)} >
                                        <Image  style={styles.MarketImg} source={{ uri: item }} />
                                    </TouchableOpacity>
                                    
                                )
                            }) }
                            </View>
                                
                                <View style={styles.DetailsMain}>
                                {Data[indexY]?.answer_data && <View style={styles.DetailsMain}><Image style={styles.AnnouncementImg} source={require('../assets/askimage.png')} />
                                    <View style={{ width: '79%', marginVertical: 20 }}><Text style={styles.NameTxt}>Name</Text>
                                        <View style={{ alignItems: 'flex-end', top: -8, position: 'absolute', right: 0 }}><Text style={styles.Datea}>{moment(Data[indexY].createdAt).format(' D MMMM YYYY')}</Text></View>
                                        <Text style={styles.tariningDetails}>{`${Data[indexY].answer_data.answer}`}</Text></View></View>}
                                        {!Data[indexY]?.answer_data && <View style={{width:'100%',alignItems:'center'}}><Text style={{color:'red'}}>Sorry didn't find any answer</Text></View>
                                        }
                                        </View>
                                   
                                        </View>


                        </View>
                    </View>
                </ScrollView>
            </View>
            <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />
            {ImgView && <View style={styles.photoContainer}>
    <ImageBackground style={styles.PhotoImg} resizeMode='center' source={{uri:Data[indexY]?.photo[Index]}}>
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

export default Myquastion

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
    headerMain: {
        width: '100%',
        height: 100,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fca237'

    },
    headerHeadingMain: {
        width: '95%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 10,
        alignSelf: 'flex-end'

    },
    headerHeading: {
        fontSize: 24,
        color: '#fff', marginHorizontal: 2

    },
    AnnouncementMain: {
        width: '98%',
        // height:100,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderBottomColor: 'rgba(228, 225, 225, 0.911)',
        // margin:10,
        // justifyContent:'center',
        // alignItems:'center'
    },

    AnnouncementHeading: {
        fontSize: 16,
        marginHorizontal: 20,
        marginVertical: 10,
        fontWeight: '600'

    },
    Datea: {
        fontSize: 12,
        marginHorizontal: 20,
        marginTop: 10,
        color: '#a0a0a0',
        right: 10
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
        // marginHorizontal:10,
        marginBottom: 10,
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
    AnnouncementImg: {
        width: 50,
        height: 50,
        margin: 5
    },
    DetailsMain: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 10
        // flexWrap:'wrap'
    },
    NameTxt: {
        marginBottom: 10,
        fontSize: 12,
        color: '#898989'

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