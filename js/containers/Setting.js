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
import { List, ListItem } from 'react-native-elements'
export default class Setting extends Component {

  render() {
    let list = [
      {
      title: '我的资料',
      icon: 'face'
      },
      {
      title: '清楚缓存',
      icon: 'clear-all'
      },
      {
        title:'意见反馈',
        icon:'email'
      },
      {
        title:'版本号',
        icon:'android'
      },
      {
        title:'app详情',
        icon:'dashboard'
      }
      ]
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'Setting'}

        />


        <List>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{name: item.icon}}
              />
            ))
          }
        </List>
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
