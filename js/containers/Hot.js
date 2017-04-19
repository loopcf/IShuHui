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
  View,
  TouchableOpacity
} from 'react-native';
import NavigationBar from '../widget/NavigationBar'
import ScrollableTabView,{ScrollableTabBar,DefaultTabBar} from 'react-native-scrollable-tab-view'
import Domestic from './Hot/Domestic';
import ShuHuiComic from './Hot/ShuHuiComic';
import Passion from './Hot/Passion';

export default class Hot extends Component {
  render() {
    return (
      <View style={styles.container}>

        <ScrollableTabView
          tabBarUnderlineStyle={{backgroundColor: '#3C3C3C', height: 2}}
          tabBarInactiveTextColor='#5e6977'
          tabBarActiveTextColor='#3C3C3C'
          tabBarBackgroundColor='#FAFDFF'
             initialPage={0}
        renderTabBar={() => <DefaultTabBar />}
        ref={(tabView) => { this.tabView = tabView }}
      >
        <ShuHuiComic tabLabel='鼠绘漫画'/>
        <Passion tabLabel='热血漫画'/>
        <Domestic tabLabel='国产漫画'/>

      </ScrollableTabView>

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
