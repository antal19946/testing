import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import { AntDesign } from '@expo/vector-icons';


const GetStartedA = (props) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum
    const [getstartedA, setgetstartedA] = useState(true)
    const [getstartedB, setgetstartedB] = useState(false)
    const [getstartedC, setgetstartedC] = useState(false)


    const nextA = () => {
        setgetstartedA(false);
        setgetstartedB(true)
    }
    const nextB = () => {
        setgetstartedA(false);
        setgetstartedB(false);
        setgetstartedC(true)
    }
    const nextBack = () => {
        setgetstartedA(true);
        setgetstartedB(false)
    }
    return (
        <View style={styles.container}>
            {getstartedA && <View style={styles.skipMain}>
                <TouchableOpacity style={styles.skipMainBtn} onPress={props.skip}>
                    <Text style={styles.skipTxt}>{i18n.t('Skip')}</Text>

                </TouchableOpacity></View>}
            {getstartedB && <View style={styles.skipMain}>
                <TouchableOpacity style={styles.skipMainBtn} onPress={props.skip}>
                    <Text style={styles.skipTxt}>{i18n.t('Skip')}</Text>

                </TouchableOpacity></View>}
            <View style={styles.imgMain}>
                {getstartedA && <Image style={styles.img} source={require('../assets/started1img.png')} />}
                {getstartedB && <Image style={styles.img} source={require('../assets/started2img.png')} />}
                {getstartedC && <Image style={styles.img} source={require('../assets/started3img.png')} />}

            </View>
            {getstartedA && <Text style={styles.Heading}>{i18n.t('Announcement')}</Text>}
            {getstartedB && <Text style={styles.Heading}>{i18n.t('Training')}</Text>}
            {getstartedC && <Text style={styles.Heading}>{i18n.t('Weather_update')}</Text>}
            {getstartedA && <Text style={styles.text}>{i18n.t('Announcement_Intro')}</Text>}
            {getstartedB && <Text style={styles.text}>{i18n.t('Training_Intro')}</Text>}
            {getstartedC && <Text style={styles.text}>{i18n.t('Weather_update_Inro')}</Text>}
            {getstartedA && <View style={styles.nextPreviewMain}>
                <TouchableOpacity></TouchableOpacity>
                <TouchableOpacity style={styles.nextBtn} onPress={nextA}><AntDesign name="right" size={24} color="#fff" /></TouchableOpacity></View>}
            {getstartedB && <View style={styles.nextPreviewMain}>
                <TouchableOpacity style={styles.previewBtn} onPress={nextBack}><AntDesign name="left" size={24} color="#fff" /></TouchableOpacity>
                <TouchableOpacity style={styles.nextBtn} onPress={nextB}><AntDesign name="right" size={24} color="#fff" /></TouchableOpacity></View>}
            {getstartedC && <TouchableOpacity style={styles.GetstartedBtn} onPress={props.GetStarted}><Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>{i18n.t('Get_Started')} </Text></TouchableOpacity>}
        </View>
    )
}

export default GetStartedA

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    imgMain: {
        height: 320,
        width: 400,
        alignSelf: 'center'
    },
    img: {
        height: '90%',
        width: '90%',
        marginHorizontal: 5,
        alignSelf: 'center'
    },
    skipMain: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 25,
        width: 60,
        borderRadius: 50,
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: 'rgb(222, 225, 228)'
    },
    skipTxt: {
        fontSize: 16,
        color: '#848484'

    },
    Heading: {
        fontSize: 24,
        color: '#404040'
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        color: '#848484',
        marginHorizontal: 10
    },
    nextPreviewMain: {
        position: 'absolute',
        bottom: 10,
        width: '90%',
        height: 50,
        justifyContent: 'space-between',
        alignContent: 'space-between',
        flexDirection: 'row'
    },
    nextBtn: {
        height: 40,
        width: 40,
        borderRadius: 50,

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fca237',

    },
    previewBtn: {
        height: 40,
        width: 40,
        borderRadius: 50,

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fca237',

    },
    GetstartedBtn: {
        width: '90%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fca237',
        borderRadius: 50,
        position: 'absolute',
        bottom: 10
    }
})