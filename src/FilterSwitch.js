import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class FilterSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categes: [
        { cat_id: '1', cat_name: props.all, backgroundcolor: '#2b478b', Fcolor: '#fff' },
        { cat_id: '2', cat_name: props.allu, backgroundcolor: '#fff', Fcolor: '#7c7c7c' },
        { cat_id: '3', cat_name: props.allm, backgroundcolor: '#fff', Fcolor: '#7c7c7c' },

      ],
      change: false,
    };
  }

  changeBackground = item => {
    let categes = JSON.parse(JSON.stringify(this.state.categes));

    for (let x = 0; x < this.state.categes.length; x++) {
      if (this.state.categes[x].cat_id == item.cat_id) {
        categes[x].backgroundcolor = '#2b478b';
        categes[x].Fcolor = '#fff';

        this.setState({
          categes: categes,
        });
      } else {
        categes[x].backgroundcolor = '#fff';
        categes[x].Fcolor = '#7c7c7c';

        this.setState({
          categes: categes,
        });
      }
    }
  };
  render() {
    let data = 'All'
    var updateValue = this.props.updateValue;

    return (
      <View style={styles.switchMain}>
        {this.state.categes.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={{
              width: '33%',
              height: 39,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              backgroundColor: item.backgroundcolor,
            }}
            onPress={() => {
              this.changeBackground(item);
              updateValue(item)
            }}>
            <Text style={{ color: item.Fcolor, fontWeight: '500', fontSize: 16, textAlign: 'center' }}>
              {' '}
              {item.cat_name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  switchMain: {
    width: '90%',
    height: 45,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
    borderBottomColor: 'rgba(0,0,0,0.026)',
        borderBottomWidth: 2,
        borderRightColor: 'rgba(0,0,0,0.046)',
        borderRightWidth: 0.8,
        borderLeftColor: 'rgba(0,0,0,0.046)',
        borderLeftWidth: 0.8,
    
  


  },
  allItem: {
    widt: '33%',
    height: 39,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50

  }
});