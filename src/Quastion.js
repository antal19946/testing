import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions,Alert,BackHandler,SafeAreaView  } from 'react-native'
import React, { useState, useEffect } from 'react'
import FilterSwitch from './FilterSwitch'
import Navbar from './Navbar'
import { AntDesign } from '@expo/vector-icons';
import TestQuastion from './TestQuastion';
import Header from './Header';
import RadioGroup from 'react-native-radio-buttons-group';
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Quastion = ({ navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum

    const [popup, setpopup] = useState(false)
    const [num, setnum] = useState(0)
    const [Test, setTest] = useState(TestQuastion[0])
    const [page, setpage] = useState(Test.slice(num, num + 2))
    const [radioButtons, setRadioButtons] = useState()




    const radioButtonsData = [{
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Option 1',
        value: 'option1'
    }, {
        id: '2',
        label: 'Option 2',
        value: 'option2'
    }]

    const [cdata, setCdata] = useState([])
    useEffect(() => {
        getUserType()

    }, [])
    console.log(cdata)
    const getUserType = async () => {
        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
        const TrainingId = await AsyncStorage.getItem('@Training_Id')
        try {
            const value = await AsyncStorage.getItem('@usertype')
            if (value === 'farmer' && TrainingId !== null) {
                fetch(`http://13.244.149.36:8080/member/training/test/${TrainingId}`, {
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
                        console.log(json)
                    })
            }
            else if (value === 'cooperative') {
                fetch(`http://13.244.149.36:8080/member/training/test/${TrainingId}`, {
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
                        console.log('cooprative')

                    })
            }
            else {
                console.log('first')
            }
        } catch (e) {
            console.log('eror')
        }
    }


    const cutPopup = () => {
        setpopup(!popup)
        navigation.navigate('Trainig')
    }
    const [Pass, setPass] = useState(false)
    const [group, setgroup] = useState()
    const [firstAnsId, setfirstAnsId] = useState()
    const [secondAnsId, setsecondAnsId] = useState()
    const [firstQuestionId, setfirstQuestionId] = useState()
    const [secondQuestionId, setsecondQuestionId] = useState()
    const [Training_Id, setTraining_Id] = useState()
    const [id, setid] = useState()
   

const [Result, setResult] = useState([])
    const [firstColor, setfirstColor] = useState(null)
    const [secondColor, setsecondColor] = useState(null)
    const [thirdColor, setthirdColor] = useState(null)
    const [colorAll, setcolorAll] = useState({
        val: [
            { btn_id: 0, clr: firstColor },
            { btn_id: 1, clr: firstColor },
            { btn_id: 2, clr: firstColor },
            { btn_id: 3, clr: firstColor },

        ]
    })
    const [colorAllsecond, setcolorAllsecond] = useState({
        val: [
            { btn_id: 0, clr: firstColor },
            { btn_id: 1, clr: firstColor },
            { btn_id: 2, clr: firstColor },
            { btn_id: 3, clr: firstColor },

        ]
    })
    const selectedAns = key => eve => {
        let categes = JSON.parse(JSON.stringify(colorAll.val))
        let index = key
        for (let x = 0; x < colorAll.val.length; x++) {
            if (colorAll.val[x].btn_id == index) {
                categes[x].clr = '#2b478b'
                // setcolorAll({val:categes})
                console.log(categes)
            } else if (colorAll.val[x].btn_id !== index) {
                categes[x].clr = firstColor
                setcolorAll({ val: categes })
            }
        }
        let anId = cdata[0]?.answer_list[index]._id
        setfirstAnsId(anId)
        let QId = cdata[0]?.answer_list[index].question_id
        setfirstQuestionId(QId)
        let TrainindId = cdata[0]?.answer_list[index].training_id
        setTraining_Id(TrainindId)
    }
    const selectedAnssecond = key => eve => {
        let categes = JSON.parse(JSON.stringify(colorAllsecond.val))
        let index = key
        for (let x = 0; x < colorAllsecond.val.length; x++) {
            if (colorAllsecond.val[x].btn_id == index) {
                categes[x].clr = '#2b478b'
                // setcolorAllsecond({val:categes})
                console.log(categes)
            } else if (colorAllsecond.val[x].btn_id !== index) {
                categes[x].clr = firstColor
                setcolorAllsecond({ val: categes })
            }
        }
        let anId = cdata[1]?.answer_list[index]._id
        setsecondAnsId(anId)
        let QId = cdata[1]?.answer_list[index].question_id
        setsecondQuestionId(QId)
        let TrainindId = cdata[0]?.answer_list[index].training_id
        setTraining_Id(TrainindId)
    }
    const submitDone = async () => {
        const user_id = await AsyncStorage.getItem("@MyApp_userId")
        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
        const TrainingId = await AsyncStorage.getItem('@Training_Id')
        try {
            if(Training_Id!==null && user_id !==null){
            let items = { training_id:Training_Id, user_id:user_id,testsubmit:[{question_id:firstQuestionId,answer_id:firstAnsId},{question_id:secondQuestionId,answer_id:secondAnsId}]}

            fetch(`http://13.244.149.36:8080/member/training/test/submit`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": Mytoken,
                    },
                    body:JSON.stringify(items)
                    
                })
                    .then(res => res.json())
                    .then(json => {
                        if(json.status===true){
                            setpopup(!popup)
                            setTimeout(() => {
                                fetch(`http://13.244.149.36:8080/member/training/test/result/${Training_Id}/${user_id}`, {
                                method: 'GET',
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "Authorization": Mytoken,
                                }
                            })
                                .then(res => res.json())
                                .then(json => {
                                   setResult(json.result)
                                   if(json.result.result==='PASS'){
                                    setPass(true)
                                   }
                                    console.log(json)
            
                                })
                            }, 1);
                        }else{
                            Alert.alert(
                                "HELLO!",
                                `${json.message}`,
        
                                [
        
                                    { text: "OK", onPress: () => navigation.navigate('Trainig') }
                                ]
                            );
                        }
                        console.log(json)
                        
                    })
                  
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

                <Header Heading={i18n.t('Training')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />
                {/* <FilterSwitch updateValue={(val)=>{
                    
                    // getUserType()
                    // setFilter(val);
                }} all={i18n.t('All_items')} allu={i18n.t('Recent')} allm={i18n.t('Old')} /> */}
                <ScrollView>
                    <View style={{ marginBottom: 0,marginTop:50 }}>
                        <View style={{ backgroundColor: '#fff8f0', width: '95%', alignSelf: 'center', borderRadius: 10, marginTop: 0 }}>
                            <View style={styles.ModuleMain}>
                                <Text style={styles.Module}>Module 1</Text></View>
                            <Text style={styles.QuastionNumHeading}>{`${i18n.t('Question')} ${num + 1} ${i18n.t('to')} ${num + 2}`}</Text>

                            <View style={styles.QuastionSheetMain}>


                                <Text style={styles.QuastionHeading}>{`${num + 1}. ${cdata[0]?.question}`}</Text>
                                <View style={styles.AnsMain}>

                                    <View style={styles.opsMain}>
                                        <View>
                                            {
                                                colorAll.val.map((citem, cind) => {
                                                    return (
                                                        <View style={{width:'100%',flexDirection:'row',marginTop:10}} key={cind}>
                                                            
                                                        <TouchableOpacity style={[styles.RadioMain, { backgroundColor: citem.clr }]}  onPress={selectedAns(cind)}>

                                                        </TouchableOpacity>
                                                        <Text  style={styles.AnsTxt}>{cdata[0]?.answer_list[cind].answer}</Text></View>
                                                    )
                                                })
                                            }
                                        </View>
                                        <View>
                                            {/* {cdata[0]?.answer_list.map((itm, ind) => {
                                                return (<Text key={ind} style={styles.AnsTxt}>{itm.answer}</Text>)
                                            })} */}
                                        </View>
                                    </View>

                                </View>
                            </View>
                            <View style={styles.QuastionSheetMain}>


                                <Text style={styles.QuastionHeading}>{`${num + 2}. ${cdata[1]?.question}`}</Text>
                                <View style={styles.AnsMain}>

                                    <View style={styles.opsMain}>
                                        <View>
                                            {
                                                colorAllsecond.val.map((citem, cind) => {
                                                    return (
                                                        <View style={{width:'100%',flexDirection:'row',marginTop:10}} key={cind}>
                                                            
                                                        <TouchableOpacity style={[styles.RadioMain, { backgroundColor: citem.clr }]} key={cind} onPress={selectedAnssecond(cind)}>

                                                        </TouchableOpacity>
                                                        <Text  style={styles.AnsTxt}>{cdata[1]?.answer_list[cind].answer}</Text></View>
                                                    )
                                                })
                                            }
                                        </View>
                                        <View>
                                            {/* {cdata[1]?.answer_list.map((itm, ind) => {
                                                return (<Text key={ind} style={styles.AnsTxt}>{itm.answer}</Text>)
                                            })} */}
                                        </View>
                                    </View>

                                </View>
                            </View>

                            <TouchableOpacity style={styles.submitAns} onPress={submitDone}><Text style={styles.submitTxt}>{i18n.t('Submit')}</Text></TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />
            {popup && <View style={styles.popupMain}>
                <View style={styles.popupbackground}>
                    <View style={styles.popupHeader}>
                        <Text style={styles.popupHeaderTxt}>{i18n.t('Result')}</Text>
                        <TouchableOpacity style={styles.cutBtn} onPress={cutPopup}>
                            <Image style={styles.cutBtnImg} source={require('../assets/popupcutbtn.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.popup}>
                        <Text style={styles.popupheading}>{`${i18n.t('You_have_completed')} 2 ${i18n.t('out_of')} 2 ${i18n.t('QuestionD')}`}</Text>
                        <Text style={styles.scorHeadind}>{i18n.t('You_score')}</Text>
                        <View style={styles.scoreMain}>
                            <Text style={styles.score}>{`${Result.percentage}%`}</Text>
                        </View>
                      {Pass &&  <Text style={styles.passFail}>{i18n.t('Pass')}</Text>}
                      {!Pass &&  <Text style={styles.passFail}>{i18n.t('Fail')}</Text>}
                    </View>
                </View>
            </View>}
        </View>
        </SafeAreaView>
    )
}

export default Quastion

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
    QuastionSheetMain: {
        width: '100%',
        marginTop: 0,
        position: 'relative',
        zIndex: -1
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
        marginHorizontal: 10,
        marginVertical: 10
    },
    Module: {
        fontSize: 12,
        color: '#d98011',
        fontWeight: '400',
        // marginHorizontal:25,
        // marginTop:20
    },
    QuastionNumHeading: {
        fontSize: 18,
        color: '#2e2e2e',
        marginLeft: 25,
        marginVertical: 10
    },
    QuastionHeading: {
        fontSize: 16,
        color: '#2e2e2e',
        marginHorizontal: 25,
        marginVertical: 20,
        fontWeight: 'bold'
    },
    AnsMain: {
        width: '70%',
        marginHorizontal: 25
    },
    submitAns: {
        height: 38,
        width: 118,
        backgroundColor: '#d98011',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 50,
        margin: 25,
        marginBottom: 30
    },
    submitTxt: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '900',
        textAlign: 'center',
    },
    popupMain: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(46, 46, 46, 0.658)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'

    },
    popupbackground: {
        height: 284,
        width: 354,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
        elevation: 3,
    },
    popupHeader: {
        width: '100%',
        height: 52,
        backgroundColor: '#ffefd9',
        justifyContent: 'center',
        top: 0,
        position: 'absolute',
        borderTopEndRadius: 25,
        borderTopStartRadius: 25
    },
    popupHeaderTxt: {
        color: '#2e2e2e',
        fontSize: 24,
        left: 15,

    },
    cutBtn: {
        height: 20,
        width: 20,
        right: 20,
        position: 'absolute'
    },
    popup: {
        height: 232,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    popupheading: {
        color: '#a0a0a0',
        fontSize: 16,
        marginTop: 30
    },
    scorHeadind: {
        fontSize: 24,
        color: '#2e2e2e'
    },
    scoreMain: {
        height: 84,
        width: 84,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center', backgroundColor: '#fcb45f'
    },
    score: {
        fontSize: 32,
        color: '#2e2e2e'
    },
    passFail: {
        fontSize: 32,
        color: '#fcb45f'
    },
    opsMain: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        width: '90%'
    },
    RadioMain: {
        width: 20,
        height: 20,
        marginHorizontal:20,
        marginVertical:5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1
    },
    RadioInner: {
        height: 15,
        width: 15
    },
    AnsTxt:{
        // marginTop:5
        // marginHorizontal:20,
        // marginVertical:5,
    }
})