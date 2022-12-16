import { StyleSheet, Text, View, TouchableOpacity, Image, Switch, TextInput, Dimensions,Alert,BackHandler,SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react';
import Header from './Header'
import { AntDesign } from '@expo/vector-icons';
import Navbar from './Navbar';
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import { USER_CHANGE_PASSWORD } from './store/actions/actionType';
import { UserChangePassword } from './store/actions/ChangePassword';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const ChangePassword = ({ navigation }) => {
    const test_store = useSelector((state) => state.Change[USER_CHANGE_PASSWORD])
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum
    const [old_password, setold_password] = useState('')
    const [new_password, setnew_password] = useState('')
    const [confirm_password, setconfirm_password] = useState('')
    const [user_id, setuser_id] = useState('')

    const oldChange = (value) => {
        setold_password(value)
    }
    const newChange = (value) => {
        setnew_password(value)
    }
    const confirmChange = (value) => {
        setconfirm_password(value)
    }
    const ResetPassword = async () => {
        let items = { user_id: user_id, old_password, new_password, confirm_password }
        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
    fetch('http://13.244.149.36:8080/user/change_password',{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": Mytoken,
        },
        body:JSON.stringify(items)
    })
        .then(res => res.json())
        .then(json => {
           
            console.log(json)
            if(json.status === true){
                Alert.alert(
                    "HELLO!",
                    "Password Updated successfully",
    
                    [
    
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  );
                setold_password('')
                setnew_password('')
                setconfirm_password('')
               
            }else if(new_password !== confirm_password){
                Alert.alert(
                    "HELLO!",
                    "Password do not Match",
    
                    [
    
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  );
                  setold_password('')
                setnew_password('')
                setconfirm_password('')
            }else{
                Alert.alert(
                    "HELLO!",
                    "Somthing went wrong!",
    
                    [
    
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  );
                  setold_password('')
                setnew_password('')
                setconfirm_password('')
            }
            console.log(json)
        
        })

    }
    useEffect(() => {
        getData()
        console.log(user_id)
    })

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("@MyApp_userId")
            if (value !== null) {
                setuser_id(value)
            }
            else {
                console.log('first')
            }
        } catch (e) {
            console.log('eror')
        }
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
                <Header Heading={i18n.t('Settings')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />
                <View style={styles.ChangePasswordMianContainer}>
                    <View style={styles.inputMain}>
                        <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/password_logo.png')} /></View>
                        <View style={styles.inputTxtMain}>
                            <Text style={styles.inputHeading}>{i18n.t('Current_password')}</Text>
                            <TextInput style={styles.input} value={old_password} onChangeText={oldChange} placeholder='****' secureTextEntry={true} />
                        </View>
                    </View>
                    <View style={styles.inputMain}>
                        <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/password_logo.png')} /></View>
                        <View style={styles.inputTxtMain}>
                            <Text style={styles.inputHeading}>{i18n.t('New_password')}</Text>
                            <TextInput style={styles.input} value={new_password} onChangeText={newChange} placeholder='****' secureTextEntry={true} />
                        </View>
                    </View>
                    <View style={styles.inputMain}>
                        <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/password_logo.png')} /></View>
                        <View style={styles.inputTxtMain}>
                            <Text style={styles.inputHeading}>{i18n.t('Confirm_password')}</Text>
                            <TextInput style={styles.input} value={confirm_password} onChangeText={confirmChange} placeholder='****' secureTextEntry={true} />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.submitBtn} onPress={ResetPassword}>
                        <Text style={styles.submitTxt} >{i18n.t('Reset_button')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />
        </View>
        </SafeAreaView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff'
    },
    containerMain: {
        height: height - 150,
        width: '100%',
        overflow: 'hidden'
    },
    ChangePasswordMianContainer: {
        top: 30
    },
    inputMain: {
        width: '90%',
        height: 70,
        backgroundColor: '#fffcf8',
        alignSelf: 'center',
        borderBottomColor: 'rgba(0,0,0,0.056)',
        borderBottomWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.046)',
        borderRightWidth: 0.8,
        borderLeftColor: 'rgba(0,0,0,0.046)',
        borderLeftWidth: 0.8,
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
        height: 60,
        width: 60,

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
})