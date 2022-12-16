import { Picker } from '@react-native-picker/picker';
import i18n from 'i18n-js';
import React, { useState } from 'react';
import { Alert, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { en, sw } from './Action/Store/Language';
import { country_code_list } from './constants'

const ForgotPassword = ({ navigation }) => {
    const [mobile, setmobile] = useState()
    const [country_code, setcountry_code] = useState('+254')
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum


    const sendOtpEmailChange = (value) => {
        setmobile(value)
    }
    const sendOtp = async () => {

        let items = { mobile, country_code }
        fetch('http://13.244.149.36:8080/user/forgotpassword/request', {
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
                    navigation.navigate('RecoverPassword', { mobile: mobile, country_code: country_code })
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
                        <View style={styles.textMain}>
                            <Text style={styles.textHeading}>{i18n.t('Welcome_Back')}</Text>
                            <Text style={styles.textTxt}>{i18n.t('Please_enter_mobile_number_here')}</Text>


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
                                    <TextInput style={styles.inputPrice} placeholderTextColor={'#c2bcbc'} keyboardType={'numeric'} value={mobile} onChangeText={sendOtpEmailChange} placeholder={`Enter contact details`} />
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.submitBtn} onPress={sendOtp}>
                            <Text style={styles.submitTxt} >{i18n.t('Send_Otp')}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

export default ForgotPassword

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
        height: '70%',
        justifyContent: 'space-between',
        // backgroundColor:'aqua',
        // alignItems:'center'
    },
    inputTxtMainv: {
        position: 'absolute',
        bottom: -25,
        flexDirection: 'row',
        justifyContent: 'space-between',
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