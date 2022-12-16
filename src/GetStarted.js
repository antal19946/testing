import { StyleSheet, Text, View, Image, TouchableOpacity,SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import GetStartedA from './GetStartedA';
import GetStartedB from './GetStardetB';
const GetStarted = ({ navigation }) => {
    // const [getstartedA, setgetstartedA] = useState(true)
    return (<SafeAreaView>
    <View style={styles.container}>
        <GetStartedA skip={()=>navigation.navigate('SignupLogin')} GetStarted={() => navigation.navigate('SignupLogin')} />

    </View>
    </SafeAreaView>
    )
}

export default GetStarted

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },

})