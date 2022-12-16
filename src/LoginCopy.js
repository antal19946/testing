import { Picker } from '@react-native-picker/picker';
import i18n from 'i18n-js';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { en, sw } from './Action/Store/Language';
import KeyBoardListner from './KeyBoardListner';
import { LOGIN, USER_PROFILE_DETAILS } from './store/actions/actionType';
import { country_code_list } from './constants'

import AsyncStorage from '@react-native-async-storage/async-storage';


const width = Dimensions.get('screen').width
const heights = Dimensions.get('screen').height
const Login = ({ navigation }) => {
    const isKeyboardOpen = KeyBoardListner()
    const [Heigh, setHeigh] = useState('100%')

    const My_Profile = useSelector((state) => state.user[USER_PROFILE_DETAILS])
    const mynum = useSelector((state) => state.counter.value)

    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum

    const test_store = useSelector((state) => state.auth[LOGIN])
    const [firstLogin, setfirstLogin] = useState(true)
    const [changePassword, setchangePassword] = useState(false)
    const [login, setlogin] = useState(false)


    const [FormData, setFormData] = useState([{}])
    const [ChengePasswordFirst, setChengePasswordFirst] = useState()
    const [ChangePasswordConfirm, setChangePasswordConfirm] = useState()
    const [UpdatePasswordData, setUpdatePasswordData] = useState()
    const [Error, setError] = useState(true)


    const [name, setname] = useState('')
    const [ActivityIndicatorc, setActivityIndicator] = useState(false)
    const [member_number, setmember_number] = useState('')
    const [gender, setgender] = useState('')
    const [Mobile, setMobile] = useState('')
    const [mobile, setmobile] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [age, setage] = useState('')
    const [photo, setphoto] = useState('');
    const [usertype, setusertype] = useState('')
    const [country_code, setcountry_code] = useState('+254')

    // const ChangePassword = ()=>{
    //     setfirstLogin(false)
    //     setchangePassword(true)
    //     setFormData((oldData)=>{
    //         return([...oldData,{SubmitLoginMobileNumber:LoginMobileNumber,SubmitLoginPassword:LoginPssword}])
    //     })
    // }
    // const Update = ()=>{
    //     if(ChengePasswordFirst === ChangePasswordConfirm ){
    //     setfirstLogin(false)
    //     setchangePassword(false)
    //     setlogin(true)}else{
    //         Alert.alert(
    //             "HELLO!",
    //             "Password do not Match",

    //             [

    //               { text: "OK", onPress: () => console.log("OK Pressed") }
    //             ]
    //           );
    //     }
    // }

    const LoginMobileNumberChange = (Value) => {
        setmobile(Value)
        // let num = Mobile
        // setmobile(Value)

    }
    const LoginPsswordChange = (Value) => {
        setpassword(Value)

    }
    // const ChengePasswordFirstChange=(Value)=>{
    //     setChengePasswordFirst(Value)
    // }
    // const ChangePasswordConfirmChange=(Value)=>{
    //     setChangePasswordConfirm(Value)
    // }

    const LoginBtn = () => {
        setActivityIndicator(true)
        let items = { mobile, password, country_code }
        fetch('http://13.244.149.36:8080/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",

            },
            body: JSON.stringify(items)
        })
            .then(res => res.json())
            .then(json => {
                setLoginData(json)
                setActivityIndicator(false)
                console.log(json)
                if (json.status !== true) {
                    Alert.alert(
                        "HELLO!",
                        `${json.message}`,

                        [

                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                    setmobile('')
                    setpassword('')
                }
            })




    }
    useEffect(() => {
        if (LoginData !== null) {
            if (LoginData.status === true) {
                storeData()
                storeprofileData()
                getUserType()
            }
        }
        if (isKeyboardOpen) {
            setHeigh(heights - 100)
        } if (!isKeyboardOpen) {
            setHeigh(heights)
        }
    })
    const [LoginData, setLoginData] = useState(null)
    // const GetProfileData = ()=>{
    //     let items = {name,member_number,gender,mobile,email,password,age,photo,usertype}
    //     console.log(items)

    // }


    const [Tokenstate, setTokenstate] = useState()


    const storeData = async () => {
        let token = LoginData.accesstoken
        let userId = LoginData.user._id
        const UserId = userId

        const jsonValue = token
        // setAppToken(token)
        // setId(UserId)
        const firstPair = ["@MyApp_Token", jsonValue]
        const secondPair = ["@MyApp_userId", UserId]

        try {


            await AsyncStorage.multiSet([firstPair, secondPair])
            //   console.log('done')
        } catch (e) {
            console.log('not stor')
        }
    }
    // useEffect(() => {

    //     if (test_store.status === true) {
    //         // setProfileData()
    //         // GetProfileData()

    //         console.log(test_store)
    //     }

    // })
    // const setProfileData=()=>{
    //     let user = test_store.user;
    //     setname(user.name)
    //     setmember_number(user.member_number)
    //     setgender(user.gender)
    //     setmobile(user.mobile)
    //     setemail(user.email)
    //     setpassword(user.password)
    //     setage(user.age)
    //     setphoto(user.photo)
    //     setusertype(user.usertype)


    // }
    const logResult = useCallback(() => {
        return 2 + 2;
    }, []);

    // useEffect(() => {

    //     // getData()
    //     // getProfile()



    // },[logResult])

    const [Id, setId] = useState('')
    const [AppToken, setAppToken] = useState('')
    const [ProfileData, setProfileData] = useState('')

    //     async function getUser() {
    //         const user_id = await AsyncStorage.getItem("@MyApp_userId")
    // setId(user_id)
    //         const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
    //         setAppToken(Mytoken)
    // console.log(AppToken)
    // console.log(Id)

    // }
    // async function  getProfile(){
    //     const Profile = await AsyncStorage.getItem("Profile_Details")

    //    console.log(Profile)

    // }



    const storeprofileData = async () => {
        const Name = ["@name", ProfileData.name]
        // const email = ["@email", ProfileData.email]
        const Gender = ['@gender', ProfileData.gender]
        const Mobile = ['@mobile', ProfileData.mobile]
        // const Photo = ['@photo', ProfileData.photo]
        const Usertype = ['@usertype', ProfileData.usertype]
        const MenberNumber = ['@member_number', ProfileData.member_number]

        try {


            await AsyncStorage.multiSet([Name, Gender, Mobile, Usertype])
            console.log('------------------------------------------------------')

            console.log('done')
        } catch (e) {
            console.log('not stor')
        }

    }
    console.log(ProfileData.usertype)



    const getUserType = async () => {
        try {
            const user_id = await AsyncStorage.getItem("@MyApp_userId")
            const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
            fetch(`http://13.244.149.36:8080/user/profile/${user_id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": Mytoken,
                }
            })
                .then(res => res.json())
                .then(json => {
                    setProfileData(json.result)
                    if (json.result !== null) {
                        navigation.navigate('Dashboard')
                        setmobile('')
                        setpassword('')
                        setLoginData(null)
                    }
                    console.log(json)
                })


        } catch (e) {
            console.log('eror')
        }
    }
    const resetBtn = async () => {
        await AsyncStorage.clear()
    }

    return (
        <SafeAreaView>
            <View style={[styles.container, { height: Heigh }]}>
                <ImageBackground style={styles.bgImg} source={require('../assets/login_background.png')}>
                    <View style={styles.headerMain}>
                        <View style={styles.headerHeadingMain}>

                            <Text style={styles.headerHeading}>{i18n.t('Login')}</Text>
                        </View>

                    </View>
                    <View style={styles.fomrMain}>
                        <View style={styles.textMain}>
                            <Text style={styles.textHeading}>{i18n.t('Welcome_Back')}</Text>
                            {/* {firstLogin && <Text style={styles.textTxt}>Please Change Password</Text>} */}
                            {/* {changePassword && <Text style={styles.textTxt}>Please Change Password</Text>} */}
                            <Text style={styles.textTxt}>{i18n.t('Please_Login_Here')}</Text>
                        </View>
                        {/* {firstLogin && <View style={styles.inputMain}>
            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/mobile_logo.png')}/></View>
            <View style={styles.inputTxtMain}>
                <Text style={styles.inputHeading}>{i18n.t('Mobile')}</Text>
                <TextInput style={styles.input}  numeric keyboardType={'numeric'} value={LoginMobileNumber} onChangeText={LoginMobileNumberChange} placeholder='Enter contact details'/>
            </View>
        </View>}
      {changePassword &&  <View style={styles.inputMain}>
            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/password_logo.png')}/></View>
            <View style={styles.inputTxtMain}>
                <Text style={styles.inputHeading}>{i18n.t('Change_password_Small')}</Text>
                <TextInput style={styles.input} value={ChengePasswordFirst} onChangeText={ChengePasswordFirstChange} placeholder='Enter password here' secureTextEntry={true}/>
            </View>
        </View>} */}
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/mobilelogojjj.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>Mobile</Text>
                                <View style={styles.inputTxtMainvm}>
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
                                    <TextInput style={styles.inputPrice} placeholderTextColor={'#c2bcbc'} keyboardType={'numeric'} value={mobile} onChangeText={LoginMobileNumberChange} placeholder={`Enter contact details`} />
                                </View>
                            </View>
                        </View>
                        {/* {firstLogin &&  <View style={styles.inputMain}>
            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/password_logo.png')}/></View>
            <View style={styles.inputTxtMain}>
                <Text style={styles.inputHeading}>{i18n.t('Password')}</Text>
                <TextInput style={styles.input} value={LoginPssword} onChangeText={LoginPsswordChange} placeholder='Enter password here'secureTextEntry={true} />
            </View>
        </View>} */}
                        {/* {changePassword &&  <View style={styles.inputMain}>
            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/password_logo.png')}/></View>
            <View style={styles.inputTxtMain}>
                <Text style={styles.inputHeading}>{i18n.t('Confirm_password')}</Text>
                <TextInput style={styles.input} value={ChangePasswordConfirm} onChangeText={ChangePasswordConfirmChange} placeholder='Enter password here' secureTextEntry={true}/>
            </View>
        </View>} */}
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/passwordiconjjjj.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>{i18n.t('Password')}</Text>
                                <TextInput style={styles.input} value={password} onChangeText={LoginPsswordChange} placeholder='Enter password here' secureTextEntry={true} />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.forgotbtn} onPress={() => navigation.navigate('ForgotPassword')} ><Text style={styles.forgottxt}>{i18n.t('Forgot_Password')}</Text></TouchableOpacity>
                        {/* {firstLogin && <TouchableOpacity style={styles.submitBtn} onPress={ChangePassword}>
            <Text style={styles.submitTxt}>{i18n.t('Change_password')}</Text>
        </TouchableOpacity>} */}
                        {/* {changePassword && <TouchableOpacity style={styles.submitBtn} onPress={Update} >
            <Text style={styles.submitTxt} >UPDATE</Text>
        </TouchableOpacity>} */}
                        <TouchableOpacity style={styles.submitBtn} onPress={LoginBtn} >
                            <Text style={styles.submitTxt} >{i18n.t('Login')}</Text>
                        </TouchableOpacity>

                        <View style={styles.signintxtMain}><Text style={styles.alreadyTxt}>{i18n.t('Dont_have_an_account')}  </Text><TouchableOpacity onPress={() => navigation.navigate('Signup')} ><Text style={styles.signinTxt}>{i18n.t('Sign_up_here')}</Text></TouchableOpacity></View>
                    </View>
                </ImageBackground>
            </View>
            {ActivityIndicatorc && <View style={{ height: '100%', width: '100%', position: 'absolute', top: 0, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color="#fca237" />
            </View>}
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',

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
    fomrMain: {
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'aqua'
    },
    textMain: {
        // height:100,
        width: '100%',
        justifyContent: 'center',
        position: 'absolute',
        top: 15,
        // left:15
    },
    textHeading: {
        fontSize: 20,
        color: '#fff',
        marginHorizontal: 15,

    },
    textTxt: {
        fontSize: 14,
        color: '#fff',
        marginHorizontal: 15
    },
    inputMain: {
        width: '90%',
        height: 70,
        backgroundColor: '#fffcf8',
        alignSelf: 'center',
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
    inputPrice: {
        width: '90%',
        // height: '50%',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        flexWrap: 'wrap',
        overflow: 'scroll'

    },
    inputTxtMain: {
        width: '80%',
        height: '70%',
        justifyContent: 'space-between',
        // justifyContent:'center',
        // backgroundColor:'aqua',
        // alignItems:'center'
    },
    inputTxtMainv: {
        width: '80%',
        height: '60%',
        // justifyContent:'center',
        // backgroundColor:'aqua',
        // alignItems:'center'
    },
    inputTxtMainvm: {
        position: 'absolute',
        bottom: -25,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    signintxtMain: {

        flexDirection: 'row',
        height: 20,
        width: '100%',
        alignItems: 'center',
        // position:'absolute',
        // bottom:0,
        alignItems: 'flex-end',
        justifyContent: 'center'

    },
    alreadyTxt: {

        //    fontWeight:'500',
        textAlign: 'center',
        color: '#fff'
    },
    signinTxt: {

        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    forgotbtn: {
        width: '85%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    forgottxt: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500'
    }
})