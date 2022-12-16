import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Dimensions, FlatList, alert, Alert, ImageBackground, BackHandler, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Navbar from './Navbar'
import { AntDesign } from '@expo/vector-icons';

import AskFilter from './AskFilter';
import Header from './Header';
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
// import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const ratio = width/541
const Agronomist = ({ route, navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum



    const [num, setnum] = useState(0)
    const [user_id, setuser_id] = useState()
    const [question, setquestion] = useState('')
    const [Data, setData] = useState([])
    const [photos, setPhotos] = useState([])
    const [ImgView, setImgView] = useState(false)
    const [Index, setIndex] = useState(0)
    const TypeQuestion = (value) => setquestion(value)

    useEffect(() => {
        if (route && route.params && route.params.photos)
            setPhotos([...photos, ...route?.params?.photos])
    }, [route?.params?.photos])

    const PutQuestion = async () => {
        setTimeout(async () => {
            let items = { user_id, question, photo: photos }
            const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
            fetch('http://13.244.149.36:8080/farm/agronomist/question/create', {
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

                    console.log(items)
                    if (json.status === true) {
                        Alert.alert(
                            "HELLO!",
                            "Query Send successfully",

                            [

                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        );
                        setquestion('')
                        setPhotos([])
                        getUser()
                        // getAllQuiery()
                    }
                })
        }, 500);


    }
    const logResult = useCallback(() => {
        return 3 + 3;
    }, []);

    useEffect(() => {
        getUser()
        getCall()
        // getAllQuiery()
        // GetQueries()
    }, [logResult])

    // async function getAllQuiery() {
    //     const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
    //     fetch('http://13.244.149.36:8080/query/all', {
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json",
    //             "Authorization": Mytoken,
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(json => {
    //             setData(json.result)
    //             console.log(json)
    //         })
    // }
    async function getUser() {
        const userId = await AsyncStorage.getItem("@MyApp_userId")
        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
        setuser_id(userId)
        console.log(userId)
        if (userId !== null) {
            const ud = JSON.stringify(userId)
            console.log(ud)
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
    const [cdata, setcdata] = useState([])
    const GetQueries = async () => {
        try {
            const value = await AsyncStorage.getItem('@MyApp_userId')
            if (value !== null) {
                fetch('http://13.244.149.36:8080/farm/queries/' + user_id)
                    .then(res => res.json())
                    .then(json => {
                        setData(json.result)
                        console.log(json)
                    })
            }

            else {
                console.log('first')
            }
        } catch (e) {
            console.log('eror')
        }
    }


    const getIndex = key => event => {
        // getUser()
        // getCall()
        let data = (key)


       
            navigation.navigate('Myquastion', { index:data,value:value })
        //  else {
        //     Alert.alert(
        //         "HELLO!",
        //         "You Have Not Answers.",

        //         [

        //             { text: "OK", onPress: () => console.log("OK Pressed") }
        //         ]
        //     );
        // }
    }

    // const endrech = () => {
    //     setnum(num + 1)
    //     setFilteredData(AnnouncementData.slice(0, num + 3))
    //     console.log(num)
    // }
    console.log(num)
    // const ChooseCameraoption = ()=>{
    //     Alert.alert('Select Opion','hello', [
    //         {
    //           text: 'Camera',
    //           onPress: () => navigation.navigate('CameraStart'),
    //           style: 'Camera',
    //         },
    //         { text: 'Gellary', onPress: () => navigation.navigate('ImageBrowserScreen') },
    //       ])
    // }

    const delItem = key => event => {
        // let indx = key
        setPhotos((old) => old.filter((item, index) => {
            return index !== key
        }))
    }
    const viewImgfunction = key=> event=>{
        setIndex(key)
        setImgView(true)
    }
    const Back = ()=>{
        if(Index>0){
            setIndex(Index-1)
        }
    }
    const Next =()=>{
        if(Index<photos.length-1){
            setIndex(Index+1)
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
    const [value, setvalue] = useState({cat_name:''})
    const getCall= async(val)=>{
        setvalue(val)
        if(val.cat_name==='My Questions' || val.cat_name === 'Maswali yangu'){
            const userId = await AsyncStorage.getItem("@MyApp_userId")
            const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
            setuser_id(userId)
            console.log(userId)
            if (userId !== null) {
                const ud = JSON.stringify(userId)
                console.log(ud)
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
        }else if(val.cat_name==='Other Questions' || val.cat_name === 'Maswali mengine'){
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
                // console.log(json)
            })
        }
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>

                <View style={styles.containerMain}>
                    <View style={{ height: height - height / 12 }}>

                        <Header Heading={i18n.t('Ask_and_agronomist')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />

                        <ScrollView >
                            <View style={styles.textAriaMain}>
                                <Image style={styles.textAreaImg} source={require('../assets/askagrohhhh.png')} />
                                <View style={styles.textArea}>

                                    <Text style={styles.textAriaHeadind}>{i18n.t('Ask_your_question')}</Text>
                                    <TextInput style={styles.input} multiline={true} placeholderTextColor={'#c2bcbc'} value={question} onChangeText={TypeQuestion} placeholder={`${i18n.t('Type_here')}....`} />
                                </View>
                            </View>
                            {/* <ImagePickerExample StartCamera={() => navigation.navigate('CameraStart')} /> */}
                            <View style={styles.imgPickerMain}>
                                <TouchableOpacity style={styles.pickerBtn} onPress={() => navigation.navigate('ImageBrowserScreen')} >
                                    <Image style={styles.pickerLogo} source={require('../assets/imgPickerhhhhh.png')} />
                                    <View style={styles.pickerBtnInner}>
                                        <Text style={styles.pickerTxt}>{i18n.t('Upload_image')}</Text>
                                        <Text style={styles.pickerTxts}>{i18n.t('Upload_here')}</Text>

                                        {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {photos && photos?.length > 0 && <ScrollView horizontal={true} style={styles.ImgViewerMain}>
                            {photos.map((item, ind) => {
                                    return (
                                        <TouchableOpacity key={ind} onPress={viewImgfunction(ind)}>
                                        <ImageBackground  style={styles.ImgViewerImg} source={{ uri: item }}>
                                            <TouchableOpacity style={styles.CutBtnMain} onPress={delItem(ind)}>
                                                <AntDesign name="minuscircle" size={24} color="black" />
                                            </TouchableOpacity>
                                        </ImageBackground>
                                        </TouchableOpacity>
                                    )
                                })}
                                 <TouchableOpacity style={styles.AddBtnMain} onPress={()=>navigation.navigate('ImageBrowserScreen')}>
                                 <AntDesign name="pluscircle" size={40} color="#fca237" />
                                            </TouchableOpacity>
                            </ScrollView>}
                            <TouchableOpacity style={styles.submitbtn} onPress={PutQuestion}>
                                <Text style={styles.submitbtnTxt}>{i18n.t('Submit')}</Text>
                            </TouchableOpacity>

                            <View style={styles.MyquestionMainContainer}>
                                <AskFilter my={i18n.t('My_questions_Small')} updateValue={(val)=>getCall(val)} other={i18n.t('Other_questions')} />
                                {/* <FlatList data={FilteredData} onEndReachedThreshold={0.01}
    onEndReached={endrech} renderItem={({item})=>{
        return(
            <TouchableOpacity  style={styles.AnnouncementMain} >
                        <Image style={styles.AnnouncementImg} source={require('../assets/askimage.png')}/>
                        <View style={styles.Announcement}>
                        
                            <Text style={styles.AnnouncementHeading}>{item.heading}</Text>
                       
                       
                            <Text style={styles.Datea}>{item.date}</Text>
                            </View>
                        <Image style={styles.commentIcone} source={require('../assets/comment_icon.png')}/>
                    </TouchableOpacity>
        )
    }}
    
    /> */}


                                {
                                    Data?.map((item, ind) => {
                                        return (
                                            <TouchableOpacity key={ind} style={styles.AnnouncementMain} onPress={getIndex(ind)}>
                                                <View style={styles.AnnouncementImg}>
                                               {item.photo.length<1 && <Image style={styles.AnnouncementImg} source={require('../assets/askimage.png')}/>}
                                                    {item.photo && item.photo.length>=1 &&<Image style={styles.AnnouncementImgInner} source={{ uri: item?.photo[0] }} />}
                                                    </View>

                                                <View style={styles.Announcement}>

                                                    <Text style={styles.AnnouncementHeading}>{item.question}</Text>


                                                    <Text style={styles.Datea}>{moment(item.createdAt).format(' D MMMM YYYY')}</Text>
                                                </View>
                                                <Image style={styles.commentIcone} source={require('../assets/comment_icon.png')} />
                                            </TouchableOpacity>
                                        )
                                    })
                                }
<View style={{height:100}}></View>
                            </View>
                            
                            </ScrollView>


                    </View>
                </View>

                <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />
{ImgView && <View style={styles.photoContainer}>
    <ImageBackground style={styles.PhotoImg} resizeMode='center' source={{uri:photos[Index]}}>
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

export default Agronomist

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
    // containerMain: {
    //     height: height - 100,
    //     width: '100%',
    //     overflow: 'hidden'
    // },
    bgImg: {
        height: '100%',
        width: '100%',
    },

    textAriaMain: {
        height: height / 7,
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#fffcf8',
        borderBottomColor: 'rgba(0,0,0,0.056)',
        borderBottomWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.046)',
        borderRightWidth: 0.8,
        borderLeftColor: 'rgba(0,0,0,0.046)',
        borderLeftWidth: 0.8,
        marginTop: 20,
        borderRadius: 10,
        flexDirection: 'row'

    },
    textAriaHeadind: {
        fontSize: 14,
        color: '#414141',
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 65
    },
    input: {
        marginHorizontal: 60,
        height: 65,
        flexWrap: 'wrap',
        overflow: 'scroll'
    },
    textAreaImg: {
        left: 0,
        position: 'absolute',
        top: 0,
        marginVertical:12,
        marginHorizontal:6,
        // margin: 10,
        height: 50,
        width: 50

    },
    textArea: {
        height: '100%',
        width: '100%'
    },
    submitbtn: {
        height: 48,
        width: '90%',
        borderRadius: 50,
        backgroundColor: '#fca237',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 0
        // marginHorizontal:10
    },
    submitbtnTxt: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff'
    },
    MyquestionMainContainer: {
        // height: height / 3,
        width: '95%',
        alignSelf: 'center',
        backgroundColor: '#fff8f0',
        marginTop: 10,
        borderRadius: 10
    },
    AnnouncementMain: {
        width: '90%',
        height: 95,
        backgroundColor: '#ffff',
        borderRadius: 10,

        marginVertical: 5,
        alignSelf: 'center',
        flexDirection: 'row'
        // justifyContent:'center',
        // alignItems:'center'
    },

    AnnouncementHeading: {
        height:35,
        fontSize: 14,
        marginTop: 10,
        marginHorizontal: 10,
        color: '#505050',
        fontWeight: '600',
        overflow:'hidden'


    },
    Datea: {
        fontSize: 12,
        marginHorizontal: 3,
        marginTop: 18,
        color: '#a2a2a2'
    },
    commentIcone: {
        height: 20,
        width: 20,
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    Announcement: {
        height: '100%',
        width: '68%',

    },
    AnnouncementImg: {
        width: height / 12,
        height: height / 12,
        marginHorizontal: 5,
        marginVertical: 7,
        borderRadius: 50
    },
    AnnouncementImgInner: {
        width: '100%',
        height: '100%',
        marginHorizontal: 5,
        borderRadius: 50
    },
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
        fontWeight: '700',
        margin: 10
    },
    pickerTxts: {
        fontSize: 13,
        color: '#c2bcbc',
        fontWeight: '400',
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
    },
    ImgViewerMain: {
        height: 130,
        // width: '100%',
        flexDirection: 'row',
        // justifyContent: 'space-around',
        // alignItems: 'center'
    },
    ImgViewerImg: {
        height: 100,
        width: 70,
        marginVertical:10,
        marginHorizontal:10
    },
    CutBtnMain: {
        position: 'absolute',
        top: -10,
        right: -10
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
    AddBtnMain:{
        height:100,
        width:50,
        justifyContent:'center',
        alignItems:'center'
    },


})