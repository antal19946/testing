import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'

const Signup = ({ navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.containerBackground} resizeMode='cover' source={require('../assets/main.png')}></ImageBackground>
            <View style={styles.btnMain}>
                <Text style={styles.heading}>{i18n.t('Sign_up')}</Text>
                <TouchableOpacity style={styles.signupFirst} onPress={() => navigation.navigate('CooperativeSignup')}><Text style={styles.signupBtnTxt}>{i18n.t('As_a_member_of_cooperative')}</Text></TouchableOpacity>
                <Text style={styles.or}>OR</Text>
                <TouchableOpacity style={styles.signupSecond} onPress={() => navigation.navigate('IndividualSignup')}><Text style={styles.signupBtnTxt}>{i18n.t('As_an_individual')}</Text></TouchableOpacity>
            </View>

        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    containerBackground: {
        width: '100%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        position: 'absolute'
    },
    btnMain: {
        width: '100%',
        height: 281,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20
        // borderRadius:40,

    },
    heading: {
        fontSize: 24,
        fontWeight: '900'

    },
    signupFirst: {
        width: '90%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fca237',
        borderRadius: 50,
        marginVertical: 20
    },
    signupBtnTxt: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16
    },
    signupSecond: {
        width: '90%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#024293',
        borderRadius: 50,
        marginVertical: 20
    },
    or: {
        fontSize: 20,
        textAlign: 'center',
        color: 'rgb(222, 225, 228)',
    }
})