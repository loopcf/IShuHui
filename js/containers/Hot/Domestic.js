/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Domestic extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.PM}>
        国产漫画
        </Text>

        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262634',
  },
  PM: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    marginBottom: 150,
    color :'#ffffff',
    fontWeight :'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
