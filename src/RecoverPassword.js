import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Alert, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import KeyBoardListner from './KeyBoardListner'
const RecoverPassword = ({ route, navigation }) => {
    const isKeyboardOpen = KeyBoardListner()
    const [otp, setotp] = useState()
    const [new_password, setnew_password] = useState()
    const [confirm_password, setconfirm_password] = useState()


    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum


    const mobile = route?.params?.mobile
    const country_code = route?.params?.country_code
    const OtpChange = (value) => {
        setotp(value)
    }
    const PasswordChange = (value) => {
        setnew_password(value)
    }
    const confirmPasswordChange = (value) => {
        setconfirm_password(value)
    }
    const Recover = async () => {

        let items = { mobile: mobile, country_code: country_code, new_password, confirm_password, otp }
        fetch('http://13.244.149.36:8080/user/forgotpassword/verify', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",

            },
            body: JSON.stringify(items)
        })
            .then(res => res.json())
            .then(json => {
                // setLoginData(json)
                console.log(json)
                if (json.status === true) {
                    Alert.alert(
                        "HELLO!",
                        `${json.message}`,

                        [

                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                    navigation.navigate('Login')
                } else {
                    Alert.alert(
                        "HELLO!",
                        `${json.message}`,

                        [

                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
            })




    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ImageBackground style={styles.bgImg} source={require('../assets/login_background.png')}>
                    <View style={styles.headerMain}>
                        <View style={styles.headerHeadingMain}>

                            <Text style={styles.headerHeading}>{i18n.t('Login')}</Text>
                        </View>

                    </View>
                    <View style={styles.fomrMain}>
                        {!isKeyboardOpen && <View style={styles.textMain}>
                            <Text style={styles.textHeading}>{i18n.t('Welcome_Back')}</Text>
                            <Text style={styles.textTxt}>{i18n.t('Recover_Password')}</Text>


                        </View>}
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/mobilelogojjj.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>{i18n.t('Enter_Otp')}</Text>
                                <TextInput style={styles.input} numeric keyboardType={'numeric'} value={otp} onChangeText={OtpChange} placeholder='Enter contact details' />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.forgotbtn} onPress={() => navigation.goBack()} ><Text style={styles.forgottxt}>{i18n.t('Resend_Otp')}</Text></TouchableOpacity>
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/passwordiconjjjj.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>{i18n.t('New_password')}</Text>
                                <TextInput style={styles.input} secureTextEntry value={new_password} onChangeText={PasswordChange} placeholder='Enter password here' />
                            </View>
                        </View>
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/passwordiconjjjj.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>{i18n.t('Confirm_password')}</Text>
                                <TextInput style={styles.input} secureTextEntry value={confirm_password} onChangeText={confirmPasswordChange} placeholder='Enter password here' />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.submitBtn} onPress={Recover}>
                            <Text style={styles.submitTxt} >{i18n.t('Recover_Password')}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

export default RecoverPassword

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',

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
    fomrMain: {
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'aqua'
    },
    textMain: {
        // height:100,
        width: '100%',
        justifyContent: 'center',
        position: 'absolute',
        top: 15,
        // left:15
    },
    textHeading: {
        fontSize: 20,
        color: '#fff',
        marginHorizontal: 15,

    },
    textTxt: {
        fontSize: 14,
        color: '#fff',
        marginHorizontal: 15
    },
    inputMain: {
        width: '90%',
        height: 70,
        backgroundColor: '#fffcf8',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        borderRadius: 10,
        marginVertical: 10

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
    signintxtMain: {

        flexDirection: 'row',
        height: 40,
        width: '100%',
        alignItems: 'center',
        // position:'absolute',
        // bottom:0,
        alignItems: 'flex-end',
        justifyContent: 'center'

    },
    alreadyTxt: {

        //    fontWeight:'500',
        textAlign: 'center',
        color: '#fff'
    },
    signinTxt: {

        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    forgotbtn: {
        width: '85%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    forgottxt: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500'
    }
})