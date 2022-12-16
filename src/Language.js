import { StyleSheet,ActivityIndicator, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Language = ({ navigation }) => {
    // useEffect(()=>{
    //     getData()
    // })
    const [ActivityIndicatorc, setActivityIndicator] = useState(false)
    const getData = async () => {
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
                        if(json.status===true) {
                            navigation.navigate('Dashboard')
                          }
                          else{
                            navigation.navigate('GetStarted')
                          }
                    })
            
          
        } catch (e) {
            console.log('eror')
        }
      }
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum

    const SwitchToEnglish = () => {
        dispatch(English())
        getData()
    }
    const SwitchToSwahili = () => {
        dispatch(Swahili())
        getData()

    }
    const [first, setfirst] = useState(false)
    useEffect(()=>{
        setTimeout(() => {
            setfirst(true)
        }, 0);
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.logoMain}><Image style={styles.logo} source={require('../assets/logossss.png')} /></View>
           {first && <View style={styles.languageBtnMain}>
                <TouchableOpacity style={styles.languageBtn} onPress={SwitchToEnglish}><Text style={styles.languageBtnTxt}>ENGLISH</Text></TouchableOpacity>
                <TouchableOpacity style={styles.languageBtn} onPress={SwitchToSwahili}><Text style={styles.languageBtnTxt}>SWAHILI</Text></TouchableOpacity>
            </View>}
            {ActivityIndicatorc && <View style={{height:'100%',width:'100%',position:'absolute',top:0,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={50} color="#fca237" />
        </View>}
        </View>
    )
}

export default Language

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fca237'
    },
    logoMain: {
        height: 300,
        width: 300
    },
    logo: {
        height: '100%',
        width: '100%',

    },
    languageBtnMain: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        height: 50,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    languageBtn: {
        width: '45%',
        height: 45,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#fff'
    },
    languageBtnTxt: {
        color: '#fca237',
        fontWeight: '700',
        fontSize: 15
    }

})