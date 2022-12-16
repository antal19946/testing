import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import FilterSwitch from './FilterSwitch';
import Navbar from './Navbar';
import Header from './Header';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Module1test = ({ navigation: { goBack } }) => {
    return (
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <Header Heading={'NOTIFICATION'} goBackBtn={() => goBack()} />
                <FilterSwitch all={i18n.t('All_items')} allu={i18n.t('Recent')} allm={i18n.t('Old')} />
            </View>
            <Navbar />
        </View>
    )
}

export default Module1test

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'

    },
    containerMain: {
        height: height - 180,
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
})