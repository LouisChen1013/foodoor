import React, { Component } from 'react';

import { View, Image } from 'react-native';

export default class ActionBarImage extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../assets/foodoor.png')}
          style={{
            width: 200,
            height: 60,
            borderRadius: 40 / 2,
            marginLeft: 90
          }}
        />
      </View>
    );
  }
}