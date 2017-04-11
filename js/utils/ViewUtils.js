import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
export default class ViewUtils{
  static getLeftButtion(callBack){
    return <TouchableOpacity
        style={{padding:8}}
        onPress={callBack}>
        <Image
          sytle={{width:26, height:26,tinitColor:'white'}}
          source={require('../../res/images/ic_arrow_back_white_36pt.png')}
        />

          </TouchableOpacity>
  }
  static getRightButton(title, callBack) {
       return <TouchableOpacity
           style={{alignItems: 'center',}}
           onPress={callBack}>
           <View style={{marginRight: 10}}>
               <Text style={{fontSize: 20, color: '#FFFFFF',}}>{title}</Text>
           </View>
       </TouchableOpacity>
   }
}
