import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
export default class AskFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categes: [
        { cat_id: '1', cat_name: props.my, backgroundcolor: '#2b478b', color: '#fff' },
        { cat_id: '2', cat_name: props.other, backgroundcolor: '#fff', color: '#7c7c7c' },


      ],
      change: false,
    };
  }

  changeBackground = item => {
    let categes = JSON.parse(JSON.stringify(this.state.categes));

    for (let x = 0; x < this.state.categes.length; x++) {
      if (this.state.categes[x].cat_id == item.cat_id) {
        categes[x].backgroundcolor = '#2b478b';
        categes[x].color = '#fff';

        this.setState({
          categes: categes,
        });
      } else {
        categes[x].backgroundcolor = '#fff';
        categes[x].color = '#7c7c7c';

        this.setState({
          categes: categes,
        });
      }
    }
  };
  render() {
    var updateValue = this.props.updateValue;
    return (
      <View style={styles.switchMain}>
        {this.state.categes.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={{
              width: '50%',
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
            <Text style={{ color: item.color, fontWeight: '500', fontSize: 16 }}>
              {/* {' '} */}
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
    height: height / 22,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 20


  },
  allItem: {
    width: '50%',
    height: 39,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50

  }
});