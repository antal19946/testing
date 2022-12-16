import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Header = (props) => {


    useEffect(() => {
        getUserType()
    }, [0])
    const [NotificationData, setNotification] = useState(null)
    const getUserType = async () => {
        // setActivityIndicator(true)
        try {
            const user_id = await AsyncStorage.getItem("@MyApp_userId")
            const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
            fetch(`http://13.244.149.36:8080/user/notification/${user_id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": Mytoken,
                }
            })
                .then(res => res.json())
                .then(json => {
                    if (json.status === true) {
                        setNotification(json.result)
                    }


                    // console.log(json)
                })


        } catch (e) {
            console.log('eror')
        }
    }
    useEffect(() => {
        if (NotificationData !== null) {
            getCounting()

        }
        // getUserType()
    })
    const [len, setlen] = useState('')
    const getCounting = () => {
        let data = ''
        if (NotificationData !== null) {
            data = NotificationData.filter((data, index) => {
                return data.is_read === false
            })

            setlen(data.length)
            // console.log(len)

        }

    }

    return (
        <View style={styles.headerMain}>
            <View style={styles.headerHeadingMain}>
                <TouchableOpacity style={styles.headerBackIcon} onPress={props.goBackBtn}>
                    <AntDesign name="left" size={21} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerHeading}>{props.Heading}</Text>
                <TouchableOpacity style={styles.notificationIcon} onPress={props.Notification}>
                    <Ionicons name="notifications-outline" size={27} color="#fff" />
                    {len !== null && len.length!==0 && <View style={styles.notiNumMain}><Text style={styles.lenTxt}>{len}</Text></View>}
                </TouchableOpacity>

            </View>


        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerMain: {
        width: '100%',
        height: height / 9,
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
        fontSize: 18,
        color: '#fff', marginHorizontal: 2,
        fontWeight: '500'

    },
    notificationIcon: {
        position: 'absolute',
        right: 30
    },
    notiNumMain: {
        height: 20,
        width: 20,
        borderRadius: 50,
        backgroundColor: '#2b478b',
        position: 'absolute',
        top: -5,
        right: -5,
        // justifyContent:'center',
        // alignItems:'center'
    },
    lenTxt: {
        color: '#fff',
        textAlign: 'center',
        // fontSize:15,

    }
})