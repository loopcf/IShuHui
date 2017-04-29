import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  navigator
} from 'react-native';
import NavigationBar from '../widget/NavigationBar'
import { List, ListItem } from 'react-native-elements'
import mApp from './mApp';
export default class Setting extends Component {

  onPressApp(){
    this.props.navigator.push({
      component:mApp,
      name:mApp,
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'Setting'}
        />
          <List>
                <ListItem
               title="我的资料"
               leftIcon={{name: 'face'}}

             />
             <ListItem
               title="意见反馈"
               leftIcon={{name: 'email'}}
             />
           </List>
           <List>
             <ListItem
               title="版本号"
               leftIcon={{name: 'android'}}
             />
             <ListItem
               title="app详情"
               leftIcon={{name: 'dashboard'}}
               onPress={()=>this.onPressApp()}
               rightTitle="它能点"
             />
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
