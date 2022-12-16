import { StyleSheet, Text, View, TouchableOpacity,ActivityIndicator, Image, ImageBackground, TextInput, ScrollView, Dimensions,BackHandler,SafeAreaView  } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Navbar from './Navbar'
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import { USER_PROFILE_DETAILS } from './store/actions/actionType'
import { GetUserProfileDetailsById } from './store/actions/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const MyProfile = ({ navigation }) => {

    const [ActivityIndicatorc, setActivityIndicator] = useState(false)
    const [ProfileData, setProfileData] = useState([])
    const getUserType = async () => {
        setActivityIndicator(true)
        try {
            const user_id = await AsyncStorage.getItem("@MyApp_userId")
            const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
                fetch(`http://13.244.149.36:8080/user/profile/${user_id}`,{
                    method:'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": Mytoken,
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        setActivityIndicator(false)
                        setProfileData(json.result)
                       
                        console.log(json)
                    })
            
          
        } catch (e) {
            console.log('eror')
        }
    }


    // console.log(My_Profile)
    const mynum = useSelector((state) => state.counter.value)
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum


    useEffect(() => {
        getMultiple()
        getUserType()

    },[])
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [gender, setgender] = useState('')
    const [mobile, setmobile] = useState('')
    const [photo, setphoto] = useState(null)
    const [userType, setuserType] = useState('')
    const [My_Profile, setMy_Profile] = useState([])
    const getMultiple = async () => {


        try {
            
            const Name = await AsyncStorage.getItem("@name")
            setname(Name)
            const Email = await AsyncStorage.getItem("@email")
            setemail(Email)
            const Gender = await AsyncStorage.getItem("@gender")
            setgender(Gender)
            const Mobile = await AsyncStorage.getItem("@mobile")
            setmobile(Mobile)
            // const Photo = await AsyncStorage.getItem("@photo")
            // setphoto(Photo)
            const Usertype = await AsyncStorage.getItem("@usertype")
            setuserType(Usertype)
            // console.log(values)

        } catch (e) {
            console.log('errror')
        }
        // setMy_Profile(value)
        // console.log(values)

        // example console.log output:
        // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
    }
    // console.log(My_Profile)
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
                <Header Heading={i18n.t('Profile')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />
                <ScrollView>
                    <View style={{ marginBottom: 20 }}>
                        <View style={styles.profilePicMain}>
                            <TouchableOpacity style={styles.profilePic}>
                                <ImageBackground style={styles.profileImg} source={require('../assets/myprofile.png')}>
                              {ProfileData && ProfileData?.photo?.length >=1 && <Image style={styles.profileImg} source={{uri:ProfileData.photo}} />}
                              </ImageBackground>
                             
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/profileiconjjjjj.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>{i18n.t('Name')}</Text>
                                <Text style={styles.input}>{ProfileData.name}</Text>
                            </View>
                        </View>

                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/gendericonjjj.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>{i18n.t('Gender')}</Text>
                                <Text style={styles.input}>{ProfileData.gender}</Text>
                            </View>
                        </View>
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/mobilelogojjj.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>{i18n.t('Mobile')}</Text>
                                <Text style={styles.input}>{ProfileData.mobile}</Text>
                            </View>
                        </View>
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/emailiconjjjj.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>{i18n.t('Email')}</Text>
                                <Text style={styles.input}>{ProfileData.email}</Text>
                            </View>
                        </View>
                        {/* <TouchableOpacity style={styles.submitBtn} onPress={()=>navigation.navigate('EditProfile')}>
            <Text style={styles.submitTxt} >{i18n.t('Edit_profile')}</Text>
        </TouchableOpacity> */}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.navbarPosition}>
                <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />
            </View>

        </View>
        {ActivityIndicatorc && <View style={{height:'100%',width:'100%',position:'absolute',top:0,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={50} color="#fca237" />
        </View>}
        </SafeAreaView>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff'
    }, containerMain: {
        height: height - 150,
        width: '100%',
        overflow: 'hidden'
    },
    profilePicMain: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputMain: {
        width: '90%',
        height: 70,
        backgroundColor: '#fffcf8',
        alignSelf: 'center',
        flexDirection: 'row',
        borderBottomColor: 'rgba(0,0,0,0.056)',
        borderBottomWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.046)',
        borderRightWidth: 0.8,
        borderLeftColor: 'rgba(0,0,0,0.046)',
        borderLeftWidth: 0.8,
        justifyContent: 'space-between',
        alignContent: 'space-between',
        borderRadius: 10,
        marginVertical: 3

    },
    inputTxtMain: {
        width: '80%',
        height: '100%',
        // justifyContent:'center',
        // backgroundColor:'aqua',
        // alignItems:'center'
    },
    inputHeading: {
        fontSize: 14,
        fontWeight: 'bold',
        height: '40%',
        marginTop: 10
    },
    input: {
        width: '80%',
        height: '50%',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        fontSize: 14,
        fontWeight: '400',
        color: '#848484'

    },
    formImg: {
        height: 50,
        width: 50,

        alignItems: 'center'
    },
    formImgMain: {
        width: 60,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navbarPosition: {
        width: '100%',
        bottom: 0,
        position: 'absolute'
    }, submitBtn: {
        width: '90%',
        justifyContent: 'center',
        height: 48,
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#fca237',
        alignSelf: 'center',
        marginVertical: 10

    },
    submitTxt: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    profileImg:{
        height:70,
        borderRadius:50,
        width:70
    }
})