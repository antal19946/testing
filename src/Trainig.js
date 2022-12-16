import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, ScrollView, Dimensions, BackHandler, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import FilterSwitch from './FilterSwitch';
import Navbar from './Navbar';
import Accordion from './Accordion';
import Header from './Header';
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import { TRAINING_MODULE } from './store/actions/actionType';
import { GetTrainingModuls } from './store/actions/Training';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Trainig = ({ navigation }) => {
    // const my_module = useSelector((state)=>state.TrainingData[TRAINING_MODULE])
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum

    const [cdata, setCdata] = useState([])
    useEffect(() => {
        getUserType()

    }, [])
    // console.log(cdata)
    const [filter, setFilter] = useState('')
    const getUserType = async () => {
        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
        try {
            const value = await AsyncStorage.getItem('@usertype')
            if (value === 'farmer') {
                fetch('http://13.244.149.36:8080/farmer/training/all', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": Mytoken,
                    }
                })
                    .then(res => res.json())
                    .then(json => {

                        setCdata(json.result)
                        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
                        console.log(json)

                    })
            }
            else if (value === 'cooperative') {
                fetch('http://13.244.149.36:8080/member/training/all', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": Mytoken,
                    }
                })
                    .then(res => res.json())
                    .then(json => {

                        setCdata(json.result)
                        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
                        console.log(json)

                    })
            }
            else {
                console.log('first')
            }
            console.log(value)
        } catch (e) {
            console.log('eror')
        }

    }


    // const Training = useSelector((state)=>state.mapingreducer)
    const [details, setdetails] = useState()
    const getIndex = key => async event => {
        let data = (key)
        // let token = TriainingId
        let userId = cdata[data]._id
        const UserId = userId

        const jsonValue = JSON.stringify(cdata[data]._id)
        // setAppToken(token)
        // setId(UserId)
        const firstPair = ["@Training_id_s", jsonValue]
        const secondPair = ["@Training_Id", UserId]

        try {


            await AsyncStorage.multiSet([firstPair, secondPair])
            console.log('done')
        } catch (e) {
            console.log('not stor')
        }
        return (
            navigation.navigate('Accordion', { key: `${data}` }))
    }


    useEffect(() => {
        const backAction = () => {
            navigation.goBack()
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [0]);
    const getCall = (val) => {
        if (val.cat_name === 'All Items' || val.cat_name === 'matangazo yote') {
            const getUserTypeAll = async () => {
                const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
                try {
                    const value = await AsyncStorage.getItem('@usertype')
                    if (value === 'farmer') {
                        fetch('http://13.244.149.36:8080/farmer/training/all', {
                            method: 'GET',
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": Mytoken,
                            }
                        })
                            .then(res => res.json())
                            .then(json => {

                                setCdata(json.result)

                                // setCdata(json.result)
                                // console.log('farmer')
                            })
                    }
                    else if (value === 'cooperative') {
                        fetch('http://13.244.149.36:8080/member/training/all', {
                            method: 'GET',
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": Mytoken,
                            }
                        })
                            .then(res => res.json())
                            .then(json => {

                                setCdata(json.result)


                            })
                    }
                    else {
                        console.log('first')
                    }
                } catch (e) {
                    console.log('eror')
                }

            }
            getUserTypeAll()
        } else if (val.cat_name === 'Recent' || val.cat_name === 'Hivi karibuni') {
            const getUserTypeRecent = async () => {
                const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
                try {
                    const value = await AsyncStorage.getItem('@usertype')
                    if (value === 'farmer') {
                        fetch('http://13.244.149.36:8080/farmer/training/all', {
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

                                    let DataResultOld = []
                                    let DataResult = json.result.filter((item) => {
                                        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                                        console.log(new Date(item.createdAt))
                                        return +moment(item.createdAt).startOf('day') > +moment().startOf('day') - 86400000 * 3


                                    })
                                    setCdata(DataResult)
                                }
                                // setCdata(json.result)
                                // console.log('farmer')
                            })
                    }
                    else if (value === 'cooperative') {
                        fetch('http://13.244.149.36:8080/member/training/all', {
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

                                    let DataResultOld = []
                                    let DataResult = json.result.filter((item) => {
                                        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                                        console.log(new Date(item.createdAt))
                                        return +moment(item.createdAt).startOf('day') > +moment().startOf('day') - 86400000 * 3


                                    })
                                    setCdata(DataResult)
                                }

                            })
                    }
                    else {
                        console.log('first')
                    }
                } catch (e) {
                    console.log('eror')
                }
            }
            getUserTypeRecent()
        } else if (val.cat_name === 'Old' || val.cat_name === 'Ya zamani') {
            const getUserTypeOld = async () => {
                const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
                try {
                    const value = await AsyncStorage.getItem('@usertype')
                    if (value === 'farmer') {
                        fetch('http://13.244.149.36:8080/farmer/training/all', {
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

                                    let DataResultOld = []
                                    let DataResult = json.result.filter((item) => {
                                        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                                        console.log(new Date(item.createdAt))
                                        return +moment(item.createdAt).startOf('day') < +moment().startOf('day') - 86400000 * 5


                                    })
                                    setCdata(DataResult)
                                }

                                // setCdata(json.result)
                                // console.log('farmer')
                            })
                    }
                    else if (value === 'cooperative') {
                        fetch('http://13.244.149.36:8080/member/training/all', {
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

                                    let DataResultOld = []
                                    let DataResult = json.result.filter((item) => {
                                        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                                        console.log(new Date(item.createdAt))
                                        return +moment(item.createdAt).startOf('day') < +moment().startOf('day') - 86400000 * 5


                                    })
                                    setCdata(DataResult)
                                    console.log('=====================================')
                                }

                            })
                    }
                    else {
                        console.log('first')
                    }
                } catch (e) {
                    console.log('eror')
                }
            }
            getUserTypeOld()
        }
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.containerMain}>
                    <Header Heading={i18n.t('Training')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />
                    <FilterSwitch updateValue={(val) => getCall(val)} all={i18n.t('All_items')} allu={i18n.t('Recent')} allm={i18n.t('Old')} />
                    <ScrollView>
                        <View style={{ marginBottom: 30 }}>
                            {
                                cdata.map((item, ind) => {
                                    return (
                                        <View key={ind} style={styles.AnnouncementMain}>
                                            <View style={styles.ModuleMain}>
                                                <Text style={styles.Datea}>{`Module ${ind + 1}`}</Text></View>
                                            <Text style={styles.AnnouncementHeading}>{item.title}</Text>
                                            <TouchableOpacity style={styles.TrainigIconMain} onPress={getIndex(ind)} key={ind}>
                                                <Image style={styles.TrainigIcon} source={require('../assets/moduleiconjjjj.png')} />
                                            </TouchableOpacity>

                                        </View>

                                    )
                                })
                            }

                        </View>
                    </ScrollView>
                </View>
                <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />
            </View></SafeAreaView>
    )
}

export default Trainig

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'

    },
    containerMain: {
        height: height - 150,
        width: '100%',
        overflow: 'hidden'
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
    AnnouncementMain: {
        width: '90%',
        height: 70,
        backgroundColor: '#fff8f0',
        alignSelf: 'center',
        marginVertical: 4,
        borderRadius: 10
        // margin:10,
        // justifyContent:'center',
        // alignItems:'center'
    },

    AnnouncementHeading: {
        fontSize: 16,
        // marginHorizontal:20,
        marginVertical: 5,
        fontWeight: '500',
        color: '#505050',
        marginHorizontal: 10

    },
    ModuleMain: {
        height: 21,
        width: 77,
        borderRadius: 50,
        backgroundColor: '#fff7ed',
        borderColor: '#f8e5cc',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        left: 5,
        marginTop: 5
    },
    Datea: {
        fontSize: 12,
        // marginHorizontal:30,
        // marginTop:10,
        color: '#d98011'
    },
    TrainigIconMain: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        top: 20,
    },
    TrainigIcon: {
        width: '100%',
        height: '100%',
        // marginVertical:20
    },
    tariningDetails: {
        marginHorizontal: 10
    },
    TestBtn: {
        height: 38,
        width: 118,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7931e',
        borderRadius: 50,
        margin: 10
    },
    TestTxt: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700'
    },
    hideDetailBtn: {
        position: 'absolute',
        bottom: 10,
        right: 10
    }

})