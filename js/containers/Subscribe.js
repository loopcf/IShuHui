/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import NavigationBar from '../widget/NavigationBar'

export default class Subscribe extends Component {
  render() {
    return (

      <View style={styles.container}>
        <NavigationBar
          title={'Subscribe'}


        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF0F3',
  },

});
