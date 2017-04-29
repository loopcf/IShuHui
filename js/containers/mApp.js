import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  navigator
} from 'react-native';
import NavigationBar from '../widget/NavigationBar'
import ViewUtils from '../utils/ViewUtils';

export default class mApp extends Component {
  onBack(){
    this.props.navigator.pop()
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'app'}
          leftButton={ViewUtils.getLeftButtion(()=>this.onBack())}
        />
        <Text style={styles.text}>
        这是一个练手App,有事请联系jxing001@163.com
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  text: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
