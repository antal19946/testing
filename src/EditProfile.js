import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker'
import i18n from 'i18n-js'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, BackHandler, Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { en, sw } from './Action/Store/Language'
import Header from './Header'
import KeyBoardListner from './KeyBoardListner'
import Navbar from './Navbar'
import { PROFILE_UPDATE } from './store/actions/actionType'
import { country_code_list } from './constants'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const EditProfile = ({ route, navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum
    const isKeyboardOpen = KeyBoardListner()
    const test_store = useSelector((state) => state.update[PROFILE_UPDATE])
    const [user_id, setuser_id] = useState('')
    const [name, setname] = useState('')
    const [gender, setgender] = useState()
    const [Mobile, setMobile] = useState('')
    const [mobile, setmobile] = useState('')
    const [Age, setAge] = useState('')
    const [age, setage] = useState('')
    const [email, setemail] = useState('')
    const [photo, setphoto] = useState(null)
    const [heightListner, setheightListner] = useState(50)
    const [country_code, setcountry_code] = useState('+254')
    useEffect(() => {
        if (route && route.params && route.params.photos)
            setphoto(route?.params?.photos)
        console.log(route?.params?.photos)
    }, [route?.params?.photos])
    const pickImage = () => {
        navigation.navigate('EditImgUpload')
    }
    useEffect(() => {
        getUserType()
    }, [0])

    useEffect(() => {
        if (isKeyboardOpen) {
            setheightListner(150)
        } if (!isKeyboardOpen) {
            setheightListner(50)
        }
    })
    const [ActivityIndicatorc, setActivityIndicator] = useState(false)
    const getUserType = async () => {
        setActivityIndicator(true)
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
                    setActivityIndicator(false)
                    let pData = json.result
                    setname(pData.name)
                    setgender(pData.gender)
                    setmobile(pData.mobile)
                    setage(pData.age)
                    setemail(pData.email)
                    setphoto(pData.photo)
                    setcountry_code(pData.country_code)

                    console.log(json)
                })


        } catch (e) {
            console.log('eror')
        }
    }


    const NameChange = (Value) => {
        setname(Value)

    }
    const MobileChange = (Value) => {

        setmobile(Value)
        // let num = parseInt(Mobile)
        // setmobile(num)

    }
    const EmailChange = (Value) => {
        setemail(Value)

    }
    const AgeChange = (Value) => {
        setage(Value)
        // let num = parseInt(Age)
        // setage(num)

    }

    const editProfile = async () => {
        setActivityIndicator(true)
        let items = { user_id, name, gender, mobile, country_code, age, email, photo }
        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
        fetch('http://13.244.149.36:8080/user/profile/update', {
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
                setActivityIndicator(false)
                console.log(json)
                if (json.status === true) {
                    Alert.alert(
                        "HELLO!",
                        "Profile Updated successfully",

                        [

                            { text: "OK", onPress: () => navigation.navigate('Dashboard', { isdeleted: json }) }
                        ]
                    );
                    setname('')
                    setgender('')
                    setmobile('')
                    setage('')
                    setemail('')
                }
            })
    }
    const logResult = useCallback(() => {
        return 2 + 2;
    }, []);

    useEffect(() => {
        getUser()

    }, [logResult])


    async function getUser() {
        const userId = await AsyncStorage.getItem("@MyApp_userId")
        setuser_id(userId)

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
                    <Header Heading={i18n.t('Profile')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />
                    <ScrollView style={{ marginBottom: 0 }}>

                        <View style={styles.profilePicMain}>
                            <TouchableOpacity style={styles.profilePic} onPress={pickImage}>
                                <ImageBackground style={styles.profileImg} source={require('../assets/profile_picture.png')}>
                                    <ImageBackground style={{ width: 79, height: 79, borderRadius: 50 }} imageStyle={{ borderRadius: 50 }} source={{ uri: photo }}>
                                        <View style={{
                                            height: 79, width: 79, borderRadius: 50, backgroundColor: 'rgba(229, 223, 223, 0.576)',
                                            justifyContent: 'center', alignItems: 'center'
                                        }}>
                                            <Text style={{ color: 'black', fontSize: 14, fontWeight: '700' }}>{i18n.t('Edit')}</Text>
                                        </View>
                                    </ImageBackground>
                                </ImageBackground>

                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/profileiconjjjjj.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>{i18n.t('Name')}</Text>
                                <TextInput style={styles.input} value={name} onChangeText={NameChange} placeholder='Enter name here' />
                            </View>
                        </View>

                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/gendericonjjj.png')} /></View>
                            <View style={styles.inputTxtMainv}>
                                <Text style={styles.inputHeading}>{i18n.t('Gender')}</Text>
                                <View style={{ top: 0, zIndex: 1, height: 40 }}>
                                    <Picker
                                        selectedValue={gender}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setgender(itemValue)
                                        }>
                                        <Picker.Item label={i18n.t('Male')} value="male" />
                                        <Picker.Item label={i18n.t('Female')} value="female" />
                                    </Picker>
                                </View>
                            </View>

                        </View>
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/mobilelogojjj.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>Mobile</Text>
                                <View style={styles.inputTxtMainvm}>
                                    <View style={{ width: 100 }}>
                                        <Picker
                                            style={{ color: '#fca237', fontSize: 15 }}
                                            selectedValue={country_code}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setcountry_code(itemValue)
                                            }>
                                            {
                                                country_code_list.map(
                                                    (item, index) => {
                                                        return (<Picker.Item key={index} style={{ color: '#fca237', fontSize: 15 }} label={`${item.dial_code} | ${item.name} `} value={item.dial_code} />)
                                                    }
                                                )
                                            }
                                        </Picker>
                                    </View>
                                    <TextInput style={styles.inputPrice} placeholderTextColor={'#c2bcbc'} keyboardType={'numeric'} value={mobile} onChangeText={MobileChange} placeholder={`Enter contact details`} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/ageiconjjjj.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>{i18n.t('Age')}</Text>
                                <TextInput style={styles.input} numeric keyboardType={'numeric'} value={age} onChangeText={AgeChange} placeholder='Enter age here' />
                            </View>
                        </View>
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/emailiconjjjj.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>{i18n.t('Email')}</Text>
                                <TextInput style={styles.input} value={email} onChangeText={EmailChange} placeholder='Enter email here' />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.submitBtn} onPress={editProfile}>
                            <Text style={styles.submitTxt} >{i18n.t('Change')}</Text>
                        </TouchableOpacity>
                        <View style={{ height: heightListner }}></View>
                    </ScrollView>
                </View>
                <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />

            </View>
            {ActivityIndicatorc && <View style={{ height: '100%', width: '100%', position: 'absolute', top: 0, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color="#fca237" />
            </View>}
        </SafeAreaView>
    )
}

export default EditProfile

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
        height: '70%',
        justifyContent: 'space-between',
        // justifyContent:'center',
        // backgroundColor:'aqua',
        // alignItems:'center'
    },
    inputTxtMainv: {
        width: '80%',
        height: '60%',
        // justifyContent:'center',
        // backgroundColor:'aqua',
        // alignItems:'center'
    },
    inputTxtMainvm: {
        position: 'absolute',
        bottom: -25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputPrice: {
        width: '90%',
        // height: '50%',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        flexWrap: 'wrap',
        overflow: 'scroll'

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
    // navbarPosition: {
    //     width: '100%',
    //     bottom: 0,
    //     position: 'absolute'
    // }, 
    submitBtn: {
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
})