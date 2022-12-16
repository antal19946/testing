import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Language from './Language';
import GetStarted from './GetStarted';
import CooperativeSignup from './CooperativeSignup';
import SignupLogin from './SignupLogin'
import Signup from './Signup';
import IndividualSignup from './IndividualSignup';
import Login from './Login';
import Dashboard from './Dashboard';
import Announcement from './Announcement';
import Trainig from './Trainig';
import Module1test from './Module1test';
import Quastion from './Quastion';
import { Provider } from 'react-redux';
import Agronomist from './Agronomist';
import Accordion from './Accordion';
import Myquastion from './Myquastion';
import Weather from './Weather';
import Market from './Market';
import FarmRecord from './FarmRecord';
import Notification from './Notification';
import Navbar from './Navbar';
import MyProfile from './MyProfile';
import Settings from './Settings';
import ChangePassword from './ChangePassword';
import MarketDetails from './MarketDetails';
import ForgotPassword from './ForgotPassword';
import RecoverPassword from './RecoverPassword';
import EditProfile from './EditProfile';
import CameraStart from './Camera';
import MainScreen from './DemoMain';
import ImageBrowserScreen from './ImgSelect';
import MarketImgPicker from './MarketuploadImg';
import CoopImgUpload from './CoopImgUpload';
import FarmRecordDetails from './FarmRecordDetails';
import IndividualImgUpload from './IndvidualImgUpload';
import EditImgUpload from './EditImgUpload';
import AboutUs from './AboutUs';

export default function Appwraper() {
  const Stack = createNativeStackNavigator();
  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName='Back' screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="SignupLogin" component={SignupLogin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="CooperativeSignup" component={CooperativeSignup} />
        <Stack.Screen name="CoopImgUpload" component={CoopImgUpload} options={{ headerShown: true }} />
        <Stack.Screen name="IndividualSignup" component={IndividualSignup} />
        <Stack.Screen name="IndividualImgUpload" component={IndividualImgUpload} options={{ headerShown: true }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Announcement" component={Announcement} />
        <Stack.Screen name="Trainig" component={Trainig} />
        <Stack.Screen name="Module1test" component={Module1test} />
        <Stack.Screen name="Accordion" component={Accordion} />
        <Stack.Screen name="Quastion" component={Quastion} />
        <Stack.Screen name="ImageBrowserScreen" component={ImageBrowserScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Agronomist" component={Agronomist} />
        
        <Stack.Screen name="Myquastion" component={Myquastion} />
        <Stack.Screen name="Weather" component={Weather} />
        <Stack.Screen name="Market" component={Market} />
        <Stack.Screen name="MarketImgPicker" component={MarketImgPicker} options={{ headerShown: true }} />
        <Stack.Screen name="FarmRecord" component={FarmRecord} />
        <Stack.Screen name="FarmRecordDetails" component={FarmRecordDetails} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="MarketDetails" component={MarketDetails} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="EditImgUpload" component={EditImgUpload} options={{ headerShown: true }} />
        <Stack.Screen name="CameraStart" component={CameraStart} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});