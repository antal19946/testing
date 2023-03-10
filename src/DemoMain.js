import React, { Component } from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';

export default class MainScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photos: []
    }
  }

  componentDidUpdate() {
    const {params} = this.props.route;
    if (params) {
      const {photos} = params;
      if (photos) this.setState({photos});
      delete params.photos;
    }
  }

  renderImage (item, i) {
    return (
      <Image
        style={{ height: 100, width: 100 }}
        source={{ uri: item.uri }}
        key={i}
      />
    )
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ height:'80%',width:'100%',marginTop:100 ,justifyContent:'center',alignItems:'center',}}>
        <Button

          title="Open image browser"
          onPress={() => { navigate('ImageBrowserScreen'); }}
        />
        <ScrollView>
          {this.state.photos.map((item, i) => this.renderImage(item, i))}
        </ScrollView>
      </View>
    );
  }
}
