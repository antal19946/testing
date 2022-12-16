import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, BackHandler, SafeAreaView } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

export default class IndividualImgUpload extends Component {
  _getHeaderLoader = () => (
    <ActivityIndicator size='small' color={'#0580FF'} />
  );

  imagesCallback = (callback) => {
    const { navigation } = this.props;
    this.props.navigation.setOptions({
      headerRight: () => this._getHeaderLoader()
    });
    callback.then(async (photos) => {
      const image_list = [];
      // const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
      await Promise.all(
        photos.map(
          async (photo) => {
            let base64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
            image_list.push(
              {
                ContentType: photo.mediaType,
                file_name: photo.filename,
                image_url: base64,
              },
            )

          }
        )
      )
      let createPost = await fetch('http://13.244.149.36:8080/file_upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json",
          // "Authorization": Mytoken,
        },
        body: JSON.stringify({ image_list })
      });
      
      createPost = await createPost.json();
      let urls = createPost?.urls
      if (urls) {
        urls = urls.map(x => x.link);
        navigation.navigate('IndividualSignup', { photos: urls[0] });
      }
    })

      .catch((e) => console.log(e));
  };

  async _processImageAsync(uri) {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  };

  _renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return <TouchableOpacity title={'Done'} onPress={onSubmit}>
      <Text onPress={onSubmit}>Done</Text>
    </TouchableOpacity>
  }

  updateHandler = (count, onSubmit) => {
    this.props.navigation.setOptions({
      title: `Selected ${count} files`,
      headerRight: () => this._renderDoneButton(count, onSubmit)
    });
  };

  renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  render() {
    const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;
    const PutImg = async () => {
      setphoto(myPhoto)
      setTimeout(async () => {
        let items = { user_id, question, photo: myPhoto }
        // const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
        fetch('http://13.244.149.36:8080/file_upload', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            // "Authorization": Mytoken,
          },
          body: JSON.stringify(items)
        })
          .then(res => res.json())
          .then(json => {

            console.log(json)
          })
      }, 500);


    }
    const back = () => {
      const { navigation } = this.props;
      const backAction = () => {
        navigation.goBack()
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove();
    }
    back()

    return (
      <View style={[styles.flex, styles.container]}>
        <ImageBrowser
          max={1}
          onChange={this.updateHandler}
          callback={this.imagesCallback}
          renderSelectedComponent={this.renderSelectedComponent}
          emptyStayComponent={emptyStayComponent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    position: 'relative'
  },
  emptyStay: {
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF'
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff'
  }
});
