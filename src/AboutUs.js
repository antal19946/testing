import { StyleSheet, Text, View, TouchableOpacity, Image, Switch, ScrollView, Dimensions,BackHandler,SafeAreaView  } from 'react-native'
import React, { useState, useEffect } from 'react';
import Header from './Header'
import Navbar from './Navbar';
import { Picker } from '@react-native-picker/picker';
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AboutUs = ({navigation}) => {
    const dispatch = useDispatch()
    const mynum = useSelector((state) => state.counter.value)
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum
  return (
    <View style={styles.container}>
      <Header Heading={i18n.t('ABOUT')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />
      <ScrollView>
        <View style={styles.logoMain}>
            <Image style={styles.logo} source={require('../assets/logo.png')}/>
        
        <View style={styles.contentMain}>
            <Text style={styles.contentHeading}>{i18n.t('About')}</Text>
            <Text style={styles.contentTxt}>{i18n.t('About_Content')}</Text>
        </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default AboutUs

const styles = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        // justifyContent:'center',
        // alignItems:'center'

    },
    logoMain:{
        width:'95%',
        justifyContent:'center',
        backgroundColor:'#fca237',
        borderRadius:10,
        alignSelf:'center',
        marginTop:20
    },
    contentMain:{
        backgroundColor:'#fff',
        width:'95%',
        alignSelf:'center',
        marginVertical:20,
        borderRadius:10
    },
    contentHeading:{
        fontSize:20,
        fontWeight:'700',
        marginHorizontal:10,
        marginVertical:10
    },
    contentTxt:{
        fontSize:14,
        marginHorizontal:10,
        marginBottom:10
    }

})