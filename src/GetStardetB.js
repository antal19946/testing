import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { AntDesign } from '@expo/vector-icons';
const GetStartedB = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.skipMain}>
                <TouchableOpacity style={styles.skipMainBtn}>
                    <Text style={styles.skipTxt}>Skip</Text>

                </TouchableOpacity></View>
            <View style={styles.imgMain}><Image style={styles.img} source={require('../assets/started2img.png')} /></View>
            <Text style={styles.Heading}>TRAINING</Text>
            <Text style={styles.text}>This library is installed by default on the template project that get through expo init -- it is part of the expo package. It includes popular icon sets and you can browse all of the icons using</Text>
            <TouchableOpacity style={styles.nextBtn}><AntDesign name="right" size={24} color="#fff" /></TouchableOpacity>
            <TouchableOpacity style={styles.previewBtn} onPress={props.Preview}><AntDesign name="left" size={24} color="#fff" /></TouchableOpacity>
        </View>
    )
}

export default GetStartedB

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
        width: 400
    },
    img: {
        height: '95%',
        width: '95%',
        marginHorizontal: 5
    },
    skipMain: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 20,
        width: 50,
        borderRadius: 50,
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: 'rgb(222, 225, 228)'
    },
    skipTxt: {
        fontSize: 13,

    },
    Heading: {
        fontSize: 25
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        color: 'rgb(222, 225, 228)',
        marginHorizontal: 10
    },
    nextBtn: {
        height: 40,
        width: 40,
        borderRadius: 50,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fca237',
        bottom: 10,
        right: 10
    },
    previewBtn: {
        height: 40,
        width: 40,
        borderRadius: 50,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fca237',
        bottom: 10,
        left: 10
    }
})