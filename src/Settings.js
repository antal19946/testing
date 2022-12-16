import { StyleSheet, Text, View, TouchableOpacity, Image, Switch, ScrollView, Dimensions, BackHandler, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react';
import Header from './Header'
import { AntDesign } from '@expo/vector-icons';
import Navbar from './Navbar';
import { Picker } from '@react-native-picker/picker';
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Settings = ({ navigation }) => {
  const mynum = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  i18n.fallbacks = true;
  i18n.translations = { en, sw };
  i18n.locale = mynum

  useEffect(() => {

  })

  const Logout = async () => {
    try {
      await AsyncStorage.clear()

      navigation.navigate('Language')


      console.log('first')

    } catch (e) {
      console.log('eror')
    }
  }



  const [selectedLanguage, setSelectedLanguage] = useState();
  const [language, setlanguage] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);



  const selectedEnglish = () => {
    dispatch(English())
    setSelectedLanguage('English')
    setlanguage(false)
  }
  const selectedSwahili = () => {
    dispatch(Swahili())
    setSelectedLanguage('Swahili')
    setlanguage(false)
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
          <View style={{ height: 20 }}></View>
          <ScrollView>
            <View style={{ marginBottom: 100 }}>
              <View style={styles.ProfileHeadingMain}>
                <Text style={styles.ProfileHeading}>{i18n.t('Profile_Small')}</Text>
              </View>
              <View style={styles.container1}>
                <TouchableOpacity style={styles.changeProfileMain} onPress={() => navigation.navigate('EditProfile')}>
                  <View style={styles.changeProfileImgMain}><Image style={styles.profileImg} source={require('../assets/profileiconjjjjj.png')} /></View>
                  <View style={styles.inputTxtMain}>
                    <Text style={styles.inputHeading}>{i18n.t('Edit_profile')}</Text>


                  </View>
                  <AntDesign name="right" size={18} color="#717171" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.changeProfileMain} onPress={() => navigation.navigate('ChangePassword')}>
                  <View style={styles.changeProfileImgMain}><Image style={styles.profileImg} source={require('../assets/changepasswordiconjjjj.png')} /></View>
                  <View style={styles.inputTxtMain}>
                    <Text style={styles.inputHeading}>{i18n.t('Change_password_Small')}</Text>


                  </View>
                  <AntDesign name="right" size={18} color="#717171" />
                </TouchableOpacity>



              </View>
              <View style={styles.ProfileHeadingMain}>
                <Text style={styles.ProfileHeading}>{i18n.t('Notification')}</Text>
              </View>
              <View style={styles.container1}>
                <TouchableOpacity style={styles.changeProfileMain}>
                  <View style={styles.changeProfileImgMain}><Image style={styles.profileImg} source={require('../assets/notificationicon (1).png')} /></View>
                  <View style={styles.inputTxtMainNotification}>
                    <Text style={styles.inputHeading}>{i18n.t('Notification')}</Text>


                  </View>
                  <Switch
                    trackColor={{ false: '#767577', true: '#e8e1e1be' }}
                    thumbColor={isEnabled ? '#fca237' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </TouchableOpacity>




              </View>
              <View style={styles.ProfileHeadingMain}>
                <Text style={styles.ProfileHeading}>{i18n.t('Regional')}</Text>
              </View>
              <View style={styles.container1}>
                <TouchableOpacity style={styles.changeProfileMain} onPress={() => setlanguage(true)}>
                  <View style={styles.changeProfileImgMain}><Image style={styles.profileImg} source={require('../assets/languageiconjjjj.png')} /></View>
                  <View style={styles.inputTxtMain}>
                    <Text style={styles.inputHeading}>{i18n.t('Language')}</Text>


                  </View>
                  <AntDesign name="right" size={18} color="#717171" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.changeProfileMain} onPress={() => navigation.navigate('AboutUs')}>
                  <View style={styles.changeProfileImgMain}><Image style={styles.profileImg} source={require('../assets/abouticonjjjjj.png')} /></View>
                  <View style={styles.inputTxtMain}>
                    <Text style={styles.inputHeading}>{i18n.t('About')}</Text>


                  </View>
                  <AntDesign name="right" size={18} color="#717171" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.changeProfileMain} onPress={Logout}>
                  <View style={styles.changeProfileImgMain}><Image style={styles.profileImg} source={require('../assets/logouticonjjjjj.png')} /></View>
                  <View style={styles.inputTxtMain}>
                    <Text style={styles.inputHeading}>{i18n.t('Logout')}</Text>


                  </View>
                  <AntDesign name="right" size={18} color="#717171" />
                </TouchableOpacity>



              </View>
            </View>
          </ScrollView>
        </View>

        <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />
        {
          language &&
          <TouchableOpacity style={styles.selectlanguageContainer} onPress={() => setlanguage(false)}>
            <View style={styles.languageGroup}>
              <TouchableOpacity style={styles.englishLanguageBtn} onPress={selectedEnglish}>
                <Text style={styles.languageTxt}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.englishLanguageBtn} onPress={selectedSwahili}>
                <Text style={styles.languageTxt}>Swahili</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        }
      </View>
    </SafeAreaView>
  )
}

export default Settings

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

  ProfileHeadingMain: {

    marginTop: 10,
    marginHorizontal: 20
    // top:20
  },
  ProfileHeading: {
    fontSize: 18,
    fontWeight: '500',
    color: '#535353',
    // marginHorizontal:15
  },
  container1: {
    width: '100%',
    marginTop: 0
    // top:50
  },
  changeProfileMain: {
    width: '90%',
    height: height / 15,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  inputTxtMain: {
    width: '78%'
  },
  inputTxtMainNotification: {
    width: '70%'
  },
  inputHeading: {
    fontSize: 14,
    color: '#717171',
    marginHorizontal: 10,
    fontWeight: '500'
  },
  profileImg: {
    height: 28,
    width: 28
  },
  selectlanguageContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(46, 46, 46, 0.658)',
    top: 0
  },
  languageGroup: {
    height: 100,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'#ffff',
    // borderRadius:10
  },
  englishLanguageBtn: {
    width: '90%',
    height: '48%',
    backgroundColor: '#fff8f0',
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  languageTxt: {
    color: "#505050",
    fontWeight: '600',
    fontSize: 14
  }
})