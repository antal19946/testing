import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, ImageBackground, Dimensions, Alert, BackHandler, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import Navbar from './Navbar';
import DateTimePicker from '@react-native-community/datetimepicker'
import Header from './Header';
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { Linking } from 'react-native'

// DateTimePickerAndroid.open(params: AndroidNativeProps)
// DateTimePickerAndroid.dismiss(mode: AndroidNativeProps['mode'])
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const FarmRecord = ({ navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dated, setDated] = useState(new Date());
    const [record_date, setrecord_date] = useState('');
    const [dateFrom, setDateFrom] = useState(new Date());
    const [datefromTxt, setdatefromTxt] = useState('')
    const [selectedfrom, setselectedfrom] = useState(true)
    const [dateFromShow, setdateFromShow] = useState(false)
    const [dateTo, setDateTo] = useState(new Date())
    const [selectedTo, setselectedTo] = useState(true)
    const [dateToShow, setdateToShow] = useState(false)
    const [dateToTxt, setdateToTxt] = useState('')
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [selected, setselected] = useState(true)
    const [open, setOpen] = useState(false)
    const [from_date, setfrom_date] = useState('')
    const [to_date, setto_date] = useState('')
    const [cdata, setcdata] = useState([])
    const onSelect = () => {
        setDatePickerVisibility(true)
        setselected(false)
    }

    const dateChange = (event, selectedDate) => {
        let currendDate = selectedDate
        let tempDate = new Date(currendDate)
        // setDated(tempDate)
        let text = ` ${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`
        setrecord_date(text)
        setDatePickerVisibility(false)
        setselected(false)
    }
    const fromDateSelect = () => {
        setdateFromShow(true)
        setselectedfrom(false)
    }
    const dateFromChange = (event, selectedDate) => {
        let currendDate = selectedDate
        let tempDate = new Date(currendDate)
        // setDated(tempDate)
        let text = ` ${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`
        setfrom_date(text)
        setdateFromShow(false)
        setselectedfrom(false)
    }
    const ToDateSelect = () => {
        setdateToShow(true)
        setselectedTo(false)
    }
    const dateToChange = (event, selectedDate) => {
        let currendDate = selectedDate
        let tempDate = new Date(currendDate)
        // setDated(tempDate)
        let text = ` ${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`
        setto_date(text)
        setdateToShow(false)
        setselectedTo(false)
    }
    const TitleChange = (value) => {
        settitle(value)
    }
    const descriptionChange = (value) => {
        setdescription(value)
    }
    const RecordCreate = async () => {

        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
        const user_id = await AsyncStorage.getItem("@MyApp_userId")
        let items = { user_id: user_id, title, description, record_date }
        console.log('------------------------')
        console.log(items)
        fetch('http://13.244.149.36:8080/farmer/record/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": Mytoken,
            },
            body: JSON.stringify(items)
        })
            .then(res => res.json())

            .then(json => {

                console.log(json)
                if (json.status === true) {
                    Alert.alert(
                        "HELLO!",
                        "Record Created successfully",

                        [

                            { text: "OK", onPress: () => getUserType() }
                        ]
                    );
                    settitle('')
                    setdescription('')

                }
            })

    }
    useEffect(() => {
        const backAction = () => {
            navigation.goBack()
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [0]);
    const AnnouncementData = [
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },

    ]
    useEffect(() => {
        getUserType()
    }, [])
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const getUserType = async () => {
        try {
            const user_id = await AsyncStorage.getItem("@MyApp_userId")
            const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
            if (user_id !== null) {
                fetch(`http://13.244.149.36:8080/farmer/record/user/${user_id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": Mytoken,
                    }
                })
                    .then(res => res.json())
                    .then(json => {

                        if (json.result !== null) {
                            setcdata(json.result)
                        }
                        console.log(json)
                    })

            } else {
                console.log('user id not found')
            }
        } catch (e) {
            console.log('eror')
        }
    }
    const getIndex = key => event => {
        let data = (key)

        return (
            navigation.navigate('FarmRecordDetails', { key: `${data}`, MarketData: cdata }))
    }
    const downloadFile = async () => {

        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
        const user_id = await AsyncStorage.getItem("@MyApp_userId")
        let item = { user_id: user_id, from_date, to_date }
        console.log('==============================')
        console.log(item)
        const uri = `http://13.244.149.36:8080/farmer/record/download/${user_id}/${item.from_date}/${item.to_date}`
        Linking.openURL(uri)
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.containerMain}>
                    <Header Heading={i18n.t('Farm_Records')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />

                    <ScrollView>
                        <View style={{ marginBottom: 20 }}>
                            <View style={styles.inputMain}>
                                <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/Titlehhhhh.png')} /></View>
                                <View style={styles.inputTxtMain}>
                                    <Text style={styles.inputHeading}>Title</Text>
                                    <TextInput style={styles.input} multiline={true} placeholderTextColor={'#c2bcbc'} value={title} onChangeText={TitleChange} placeholder={`${i18n.t('Title_here')}....`} />
                                </View>
                            </View>
                            <View style={styles.inputMainTextarea}>
                                <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/discriptionhhh.png')} /></View>
                                <View style={styles.inputTxtMain}>
                                    <Text style={styles.inputHeading}>{i18n.t('Description')}</Text>
                                    <TextInput style={[styles.input, { height: 60 }]} multiline={true} placeholderTextColor={'#c2bcbc'} value={description} onChangeText={descriptionChange} placeholder={`${i18n.t('Type_here')}....`} />
                                </View>
                            </View>
                            <View>

                                <TouchableOpacity style={styles.inputMain} onPress={onSelect} >
                                    <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/dateiconjjjj.png')} /></View>
                                    <View style={styles.inputTxtMain}>
                                        <Text style={styles.inputHeading}>{i18n.t('Date')}</Text>
                                        {selected && <Text style={styles.input}>{`${i18n.t('Select_here')}`}</Text>}
                                        {!selected && <Text>selected: {`${record_date}`}</Text>}
                                    </View>
                                </TouchableOpacity>
                                {isDatePickerVisible && <DateTimePicker
                                    testID='dateTimePicker'
                                    mode='date'
                                    value={dated}
                                    display='default'
                                    onChange={dateChange} />}



                            </View>
                            <TouchableOpacity style={styles.submitbtn} onPress={RecordCreate}><Text style={styles.btnTxt}>{i18n.t('Add_record')}</Text></TouchableOpacity>












                            <View style={styles.downloadFileMain}>
                                <View style={styles.downloadFileHeadingMain}>
                                    <Text style={styles.downloadFileHeading}>{i18n.t('Download_file')}</Text>
                                </View>
                                <TouchableOpacity style={styles.inputMainDownload} onPress={fromDateSelect}>
                                    <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/dateiconjjjj.png')} /></View>
                                    <View style={styles.inputTxtMain}>
                                        <Text style={styles.inputHeading}>{i18n.t('From')}</Text>
                                        {selectedfrom && <Text style={styles.input}>{`${i18n.t('Select_here')}`}</Text>}
                                        {!selectedfrom && <Text>{`${from_date}`}</Text>}
                                    </View>
                                </TouchableOpacity>

                                {dateFromShow && <DateTimePicker
                                    testID='dateTimePicker'
                                    mode='date'
                                    value={dateFrom}
                                    display='default'
                                    onChange={dateFromChange} />}
                                <TouchableOpacity style={styles.inputMainDownload} onPress={ToDateSelect}>
                                    <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/dateiconjjjj.png')} /></View>
                                    <View style={styles.inputTxtMain}>
                                        <Text style={styles.inputHeading}>{i18n.t('To')}</Text>
                                        {selectedTo && <Text style={styles.input}>{`${i18n.t('Select_here')}`}</Text>}
                                        {!selectedTo && <Text>{`${to_date}`}</Text>}
                                    </View>
                                </TouchableOpacity>

                                {dateToShow && <DateTimePicker
                                    testID='dateTimePicker'
                                    mode='date'
                                    value={dateTo}
                                    display='default'
                                    onChange={dateToChange} />}
                                <TouchableOpacity style={styles.submitbtn} onPress={downloadFile}><Text style={styles.btnTxt}>{i18n.t('Download')}</Text></TouchableOpacity>

                            </View>
                            {
                                cdata?.map((item, ind) => {
                                    return (
                                        <TouchableOpacity key={ind} style={styles.AnnouncementMain} onPress={getIndex(ind)}>

                                            <Text style={styles.AnnouncementHeading}>{item.title}</Text>


                                            <Text style={styles.Datea}>{moment(item.record_date).format(' D MMMM YYYY')}</Text>

                                        </TouchableOpacity>
                                    )
                                })
                            }

                        </View>
                    </ScrollView>
                </View>
                <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />
            </View>
        </SafeAreaView>
    )
}

export default FarmRecord

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
    inputMain: {
        width: '90%',
        height: 70,
        backgroundColor: '#fffcf8',
        borderBottomColor: 'rgba(0,0,0,0.056)',
        borderBottomWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.046)',
        borderRightWidth: 0.8,
        borderLeftColor: 'rgba(0,0,0,0.046)',
        borderLeftWidth: 0.8,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10

    },
    inputMainTextarea: {
        width: '90%',
        height: 100,
        backgroundColor: '#fffcf8',
        borderBottomColor: 'rgba(0,0,0,0.056)',
        borderBottomWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.046)',
        borderRightWidth: 0.8,
        borderLeftColor: 'rgba(0,0,0,0.046)',
        borderLeftWidth: 0.8,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        borderRadius: 10,
        marginTop: 10

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
        height: '25%',
        alignItems: 'flex-end',
        marginTop: 5
    },
    input: {
        width: '90%',
        color: '#c2bcbc',
        height: 40,
        overflow: 'scroll',
        flexWrap: 'wrap'
        // justifyContent:'flex-start',
        // alignContent:'flex-end',

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
    submitbtn: {
        height: 48,
        width: '90%',
        backgroundColor: '#fca237',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10
    },
    btnTxt: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500'
    },
    downloadFileMain: {
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center', flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20

    },
    downloadFileHeadingMain: {
        width: '100%'
    },
    downloadFileHeading: {
        fontSize: 16,
        color: '#414141',
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 10
    },
    inputMainDownload: {
        width: '45%',
        height: 70,
        backgroundColor: '#fffcf8',
        borderBottomColor: 'rgba(0,0,0,0.056)',
        borderBottomWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.046)',
        borderRightWidth: 0.8,
        borderLeftColor: 'rgba(0,0,0,0.046)',
        borderLeftWidth: 0.8,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        borderRadius: 10,
        marginVertical: 0,
        marginBottom: 10
    },
    AnnouncementMain: {
        width: '95%',
        height: 100,
        backgroundColor: '#fff8f0',
        borderRadius: 10,
        margin: 10,
        marginTop: 20,
        // justifyContent:'center',
        // alignItems:'center'
    },

    AnnouncementHeading: {
        fontSize: 16,
        margin: 20,
        fontWeight: '600'

    },
    Datea: {
        fontSize: 12,
        marginHorizontal: 20,
        color: '#a2a2a2'
    }
})