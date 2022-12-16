import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import i18n from 'i18n-js';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { en, sw } from './Action/Store/Language';
import FilterSwitch from './FilterSwitch';
import Header from './Header';
import Navbar from './Navbar';
import { country_code_list } from './constants'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Market = ({ route, navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum

    useEffect(() => {
        if (route && route.params && route.params.photos)
            setPhotos([...photos, ...route?.params?.photos])
    }, [route?.params?.photos])


    const myPhoto = route?.params?.photos
    const [photos, setPhotos] = useState([])
    const [title, setTitle] = useState()
    const [description, setDiscription] = useState()
    const [price, setPrice] = useState()
    const [FormData, setFormData] = useState([])
    const [ImgView, setImgView] = useState(false)
    const [price_symbol, setprice_symbol] = useState('$')
    const [Index, setIndex] = useState(0)
    const [country_code, setcountry_code] = useState('+254')
    const [mobile, setmobile] = useState('')

    useEffect(() => {
        AllProduct()
    }, [])
    const MobileChange = (Value) => {

        setmobile(Value)
        // let num = parseInt(Mobile)
        // setmobile(num)

    }
    useEffect(() => {
        const jsonData = route?.params?.isdeleted
        if (jsonData?.status === true) {
            AllProduct()
            console.log('.........................................')
            console.log(route?.params?.isdeleted)
        }
    }, [route?.params?.isdeleted])
    const [filter, setFilter] = useState('')
    const AllProduct = async () => {
        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
        try {
            const value = await AsyncStorage.getItem('@usertype')

            fetch('http://13.244.149.36:8080/farmer/market/all', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": Mytoken,
                }
            })
                .then(res => res.json())
                .then(json => {

                    setFormData(json.result)

                })


        } catch (e) {
            console.log('eror')
        }
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const TitleChange = (Value) => {
        setTitle(Value)
    }
    const DiscriptionChange = (Value) => {
        setDiscription(Value)
    }
    const PriceChange = (Value) => {
        setPrice(Value)
    }
    // const SubmitData = () => {
    //     setFormData((oldData) => {
    //         return ([...oldData, { submitTitle: Title, submitDiscription: Discription, submitPrice: Price, submitimage: image, }])
    //     })
    //     return (
    //         setTitle(''),
    //         setDiscription(''),
    //         setImage(null),
    //         setPrice('')
    //     )
    // }
    const SubmitData = async () => {
        const userId = await AsyncStorage.getItem("@MyApp_userId")
        let items = { compeany_id: userId, title, description, price, photo: photos, price_symbol: price_symbol, country_code, mobile }
        if (items.photo && items.photo.length === 0) delete items.photo
        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
        fetch('http://13.244.149.36:8080/farm/market/create', {
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
                        "Commodity Market in Product Add Successfully",

                        [

                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                    setTitle('')
                    setDiscription('')
                    setPrice('')
                    setPhotos([])
                    AllProduct()
                } else {
                    Alert.alert(
                        "HELLO!",
                        `${json.message}`,

                        [

                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                    //   setTitle('')
                    //   setDiscription('')
                    //   setPrice('')
                    //   setPhotos([])
                    //   AllProduct()
                }
            })

    }

    const getIndex = key => event => {
        let data = (key)

        return (
            navigation.navigate('MarketDetails', { key: `${data}`, MarketData: FormData[data] }))
    }
    useEffect(() => {
        const backAction = () => {
            navigation.goBack()
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [0]);
    const delItem = key => event => {
        // let indx = key
        setPhotos((old) => old.filter((item, index) => {
            return index !== key
        }))
    }
    const getCall = (val) => {
        if (val.cat_name === 'All Items' || val.cat_name === 'matangazo yote') {
            const AllProductAll = async () => {
                const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
                try {
                    const value = await AsyncStorage.getItem('@usertype')

                    fetch('http://13.244.149.36:8080/farmer/market/all', {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": Mytoken,
                        }
                    })
                        .then(res => res.json())
                        .then(json => {

                            setFormData(json.result)

                        })


                } catch (e) {
                    console.log('eror')
                }
            }
            AllProductAll()
        } else if (val.cat_name === 'Recent' || val.cat_name === 'Hivi karibuni') {
            const AllProductRecent = async () => {
                const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
                try {
                    const value = await AsyncStorage.getItem('@usertype')

                    fetch('http://13.244.149.36:8080/farmer/market/all', {
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
                                setFormData(DataResult)
                            }
                        })


                } catch (e) {
                    console.log('eror')
                }
            }
            AllProductRecent()

        } else if (val.cat_name === 'Old' || val.cat_name === 'Ya zamani') {
            const AllProductOld = async () => {
                const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
                try {
                    const value = await AsyncStorage.getItem('@usertype')

                    fetch('http://13.244.149.36:8080/farmer/market/all', {
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
                                setFormData(DataResult)
                            }
                        })


                } catch (e) {
                    console.log('eror')
                }
            }
            AllProductOld()
        }
    }
    const viewImgfunction = key => event => {
        setIndex(key)
        setImgView(true)
    }
    const Back = () => {
        if (Index > 0) {
            setIndex(Index - 1)
        }
    }
    const Next = () => {
        if (Index < photos.length - 1) {
            setIndex(Index + 1)
        }
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.containerMain}>
                    <Header Heading={i18n.t('Commodity_market')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />
                    <FilterSwitch updateValue={(val) => getCall(val)} all={i18n.t('All_items')} allu={i18n.t('Recent')} allm={i18n.t('Old')} />
                    <ScrollView>
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/Titlehhhhh.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>Title</Text>
                                <TextInput style={styles.input} multiline={true} placeholderTextColor={'#c2bcbc'} value={title} onChangeText={TitleChange} placeholder={`${i18n.t('Title_here')}...`} />
                            </View>
                        </View>
                        <View style={styles.inputMainTextarea}>
                            <View style={styles.formImgMainTxtArea}><Image style={styles.formImg} source={require('../assets/discriptionhhh.png')} /></View>
                            <View style={styles.inputTxtMainTextArea}>
                                <Text style={styles.inputHeading}>{i18n.t('Description')}</Text>
                                <TextInput style={[styles.input, { height: 70 }]} multiline={true} placeholderTextColor={'#c2bcbc'} value={description} onChangeText={DiscriptionChange} placeholder={`${i18n.t('Type_here')}...`} />
                            </View>
                        </View>
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/PRICEICONjjjjj.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>{i18n.t('Add_price')}</Text>
                                <View style={styles.inputTxtMainv}>
                                    <View style={{ width: 110 }}>
                                        <Picker
                                            style={{ color: '#fca237', fontSize: 15 }}
                                            selectedValue={price_symbol}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setprice_symbol(itemValue)
                                            }>
                                            <Picker.Item style={{ color: '#fca237', fontSize: 15 }} label="₹ INR " value="₹" />
                                            <Picker.Item style={{ color: '#fca237', fontSize: 15, }} label="$ USD" value="$" />
                                            <Picker.Item style={{ color: '#fca237', fontSize: 15 }} label="€ EUR" value="€" />
                                            <Picker.Item style={{ color: '#fca237', fontSize: 15 }} label="£ FKP" value="£" />
                                            <Picker.Item style={{ color: '#fca237', fontSize: 15 }} label="¥ CNY" value="¥" />
                                            <Picker.Item style={{ color: '#fca237', fontSize: 15 }} label="£ GIP" value="£" />
                                        </Picker>
                                    </View>
                                    <TextInput style={styles.inputPrice} placeholderTextColor={'#c2bcbc'} keyboardType={'numeric'} value={price} onChangeText={PriceChange} placeholder={`${i18n.t('Type_here')}....`} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/mobilelogojjj.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>Mobile</Text>
                                <View style={styles.inputTxtMainv}>
                                    <View style={{ width: 100 }}>
                                        <Picker
                                            style={{ color: '#fca237', fontSize: 15 }}
                                            selectedValue={country_code}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setcountry_code(itemValue)
                                            }>
                                            {
                                                country_code_list.map(
                                                    (item, index) => {
                                                        return (<Picker.Item key={index} style={{ color: '#fca237', fontSize: 15 }} label={`${item.dial_code} | ${item.name} `} value={item.dial_code} />)
                                                    }
                                                )
                                            }
                                        </Picker>
                                    </View>
                                    <TextInput style={styles.inputPrice} placeholderTextColor={'#c2bcbc'} keyboardType={'numeric'} value={mobile} onChangeText={MobileChange} placeholder={`Enter contact details`} />
                                </View>
                            </View>
                        </View>

                        <View style={styles.imgPickerMain}>
                            <TouchableOpacity style={styles.pickerBtn} onPress={() => navigation.navigate('MarketImgPicker')} >
                                <Image style={styles.pickerLogo} source={require('../assets/imgPickerhhhhh.png')} />
                                <View style={styles.pickerBtnInner}>
                                    <Text style={styles.pickerTxt}>{i18n.t('Upload_image')}</Text>
                                    <Text style={styles.pickerTxts}>{`${i18n.t('Upload_here')}`}</Text>

                                    {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
                                </View>
                            </TouchableOpacity>
                        </View>
                        {photos && photos?.length > 0 && <ScrollView horizontal={true} style={styles.ImgViewerMain}>
                            {photos.map((item, ind) => {
                                return (
                                    <TouchableOpacity key={ind} onPress={viewImgfunction(ind)}>
                                        <ImageBackground style={styles.ImgViewerImg} source={{ uri: item }}>
                                            <TouchableOpacity style={styles.CutBtnMain} onPress={delItem(ind)}>
                                                <AntDesign name="minuscircle" size={24} color="black" />
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                )
                            })}
                            <TouchableOpacity style={styles.AddBtnMain} onPress={() => navigation.navigate('MarketImgPicker')}>
                                <AntDesign name="pluscircle" size={40} color="#fca237" />
                            </TouchableOpacity>
                        </ScrollView>}
                        <TouchableOpacity style={styles.submitbtn} onPress={SubmitData}><Text style={styles.btnTxt}>{i18n.t('Submit')}</Text></TouchableOpacity>
                        <View style={{ marginBottom: 20 }}>
                            {
                                FormData.map((item, ind) => {
                                    return (
                                        <View key={ind} style={styles.AnnouncementMain}>
                                            <View style={styles.AnnouncementImg}>
                                                {item.photo.length < 1 && <Image style={styles.AnnouncementImg} source={require('../assets/askimage.png')} />}
                                                {item.photo && item.photo.length >= 1 && <Image style={styles.AnnouncementImgInner} source={{ uri: item?.photo[0] }} />}
                                            </View>
                                            <View style={styles.DetailsTxtMain}><Text style={styles.AnnouncementHeading}>{item.title}</Text>
                                                <Text style={styles.discriptionTxt}>{item.description}</Text></View>
                                            <TouchableOpacity style={styles.TrainigIconMain} onPress={getIndex(ind)} key={ind}>
                                                <Image style={styles.TrainigIcon} source={require('../assets/moduleiconjjjj.png')} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.priceBtn}>
                                                <Text style={styles.priceTxt}>{`Price ${item.price_symbol} ${item.price}`}</Text>
                                            </TouchableOpacity>

                                        </View>
                                    )
                                })
                            }</View>
                    </ScrollView>
                </View>
                <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />
                {ImgView && <View style={styles.photoContainer}>
                    <ImageBackground style={styles.PhotoImg} resizeMode='center' source={{ uri: photos[Index] }}>
                        <TouchableOpacity style={styles.crossBtn} onPress={() => setImgView(false)}>
                            <AntDesign name="closecircleo" size={35} color="black" />
                        </TouchableOpacity>
                        <View style={styles.NP_btn}>

                            <TouchableOpacity onPress={Back}>
                                <AntDesign name="leftcircleo" size={40} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={Next}>
                                <AntDesign name="rightcircleo" size={40} color="black" />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>}
            </View>
        </SafeAreaView>
    )
}

export default Market

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
        justifyContent: 'space-between',
        alignContent: 'space-between',
        borderRadius: 10,
        marginVertical: 3

    },
    inputMainTextarea: {
        width: '90%',
        height: height / 7,
        backgroundColor: '#fffcf8',
        borderBottomColor: 'rgba(0,0,0,0.056)',
        borderBottomWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.046)',
        borderRightWidth: 0.8,
        borderLeftColor: 'rgba(0,0,0,0.046)',
        borderLeftWidth: 0.8,
        alignSelf: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        borderRadius: 10,
        marginVertical: 3

    },
    inputTxtMain: {
        width: '80%',
        height: '70%',
        justifyContent: 'space-between',
        // backgroundColor:'aqua',
        // alignItems:'center'
    },
    inputTxtMainv: {
        position: 'absolute',
        bottom: -25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputTxtMainTextArea: {
        width: '80%',
        height: '50%',
        justifyContent: 'space-between',
    },
    inputHeading: {
        fontSize: 14,
        fontWeight: '700',
        height: '40%',
        marginTop: 10
    },
    input: {
        width: '90%',
        height: '50%',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        flexWrap: 'wrap',
        overflow: 'scroll'

    },
    inputPrice: {
        width: '90%',
        // height: '50%',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        flexWrap: 'wrap',
        overflow: 'scroll'

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
    formImgMainTxtArea: {
        width: 60,
        height: '60%',
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
        alignSelf: 'center', marginBottom: 20
    },
    btnTxt: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500'
    },
    AnnouncementMain: {
        width: '90%',
        height: 110,
        backgroundColor: '#fff8f0',
        borderRadius: 10,

        marginVertical: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
        // justifyContent:'center',
        alignItems: 'center'
    },
    DetailsTxtMain: {
        width: '70%',
        height: 70,
        position: 'absolute',
        top: 0,
        left: 80,
        // marginVertical:5,
        overflow: 'hidden',
        justifyContent: 'space-between'
    },

    AnnouncementHeading: {
        fontSize: 14,
        marginTop: 8,
        marginLeft: 8,
        color: '#505050',
        fontWeight: '600'

    },
    discriptionTxt: {
        marginVertical: 5,

        marginHorizontal: 12,
        fontSize: 14,
        color: '#505050'
    },
    Datea: {
        fontSize: 12,
        marginHorizontal: 10,
        marginVertical: 10,
        color: '#a2a2a2'
    },
    TrainigIconMain: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 5,
        top: 40,
    },
    TrainigIcon: {
        width: '100%',
        height: '100%',
        // marginVertical:20
    },
    commentIcone: {
        height: 20,
        width: 20,
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    Announcement: {
        height: '100%',
        width: '80%',

    },
    AnnouncementImg: {
        width: 70,
        height: 70,
        margin: 5,
        borderRadius: 50
    },
    AnnouncementImgInner: {
        width: '100%',
        height: '100%',
        marginHorizontal: 5,
        borderRadius: 50
    },
    priceBtn: {
        position: 'absolute',
        bottom: 5,
        left: 80,
        height: 28,
        width: 94,
        borderRadius: 50,
        backgroundColor: '#2b478b',
        justifyContent: 'center',
        alignItems: 'center'
    },
    priceTxt: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600'
    },
    imgPickerMain: {
        height: 70,
        width: '90%',
        justifyContent: 'center',
        borderBottomColor: 'rgba(0,0,0,0.056)',
        borderBottomWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.046)',
        borderRightWidth: 0.8,
        borderLeftColor: 'rgba(0,0,0,0.046)',
        borderLeftWidth: 0.8,
        alignItems: 'center',
        position: 'relative',
        marginVertical: 3,
        backgroundColor: '#fffcf8',

        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    pickerBtn: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row'

    },
    pickerTxt: {
        fontSize: 14,
        color: '#414141',
        fontWeight: '700',
        margin: 10
    },
    pickerTxts: {
        fontSize: 12,
        color: '#c2bcbc',
        fontWeight: '400',
        marginHorizontal: 10
        // margin:10
    },
    pickerBtnInner: {
        height: '100%',
        width: '60%',
        right: 0,


    },
    pickerLogo: {
        marginHorizontal: 5,
        height: 50,
        width: 50
    },
    ImgViewerMain: {
        height: 130,
        // width: '100%',
        flexDirection: 'row',
        // justifyContent: 'space-around',
        // alignItems: 'center'
    },
    ImgViewerImg: {
        height: 100,
        width: 70,
        marginVertical: 10,
        marginHorizontal: 10
    },
    CutBtnMain: {
        position: 'absolute',
        top: -10,
        right: -10
    },
    AddBtnMain: {
        height: 100,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photoContainer: {
        height: height,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(46, 46, 46, 0.658)',
        top: 0
    },
    PhotoImg: {
        width: '100%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    NP_btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center'
    },
    crossBtn: {
        position: 'absolute',
        top: 20,
        right: 10

    }


})