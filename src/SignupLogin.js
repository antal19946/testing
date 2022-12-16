import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'

const SignupLogin = ({ navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum
    return (
        <View style={styles.container}>
            <View style={styles.logoMain}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />

            </View>
            <View style={styles.txtMain}><Text style={styles.text}>This library is installed by default on the template project that get through expo init -- it is part of the expo package. It includes popular icon sets and you can browse all of the icons using</Text></View>
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')} ><Text style={styles.loginBtnTxt}>{i18n.t('Login')}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate('Signup')} ><Text style={styles.signupBtnTxt}>{i18n.t('Sign_up')}</Text></TouchableOpacity>
        </View>
    )
}

export default SignupLogin

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fca237'
    },
    logoMain: {
        height: 214,
        width: 400
    },
    logo: {
        height: '100%',
        width: '100%',

    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        color: 'rgb(222, 225, 228)',
        marginHorizontal: 10
    },
    loginBtn: {
        width: '90%',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        marginTop: 40
    },
    loginBtnTxt: {
        color: '#fca237',
        fontWeight: '700',
        fontSize: 16
    },
    signupBtn: {
        width: '90%',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 50,
        marginTop: 40
    },
    signupBtnTxt: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16
    }
})