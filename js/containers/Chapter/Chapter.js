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
  TouchableOpacity,

} from 'react-native';
import Cookie from 'react-native-cookie';

export default class Chapter extends Component {
  constructor(props) {
   super(props);
   this.state={
     data:'s',
     Cookie:'c',
     sub:'sub',
     hot:'hot',
     out:'out'
   }
 }

 loData(url){
   let formData = new FormData();
formData.append("Email","jxing010@163.com");
formData.append("Password","b945ef32dd6dc42cac45e7226f793bdb");
formData.append("FromType","2");
   fetch(url,{
     method:'POST',
     header:{
    //    'Accpet':'application/json',
       'Content-Type':'application/json',
     },
     body: formData
    //  JSON.stringify({Email:'jxing010@163.com',  Password:'b945ef32dd6dc42cac45e7226f793bdb'  ,FromType: '2'

  //  })
   })
   .then(response=>response.json())
   .then(result=>{
      this.setState({
        data:JSON.stringify(result),

      })
        Cookie.get('http://www.ishuhui.net', 'PHPSESSID').then((cookie)=>{
          this.setState({
            Cookie:cookie
          })
        })
   })
   .catch(e=>{
     this.setState({
       data:'e'
     })
   })


}
Logout(){
  Cookie.clear('http://www.ishuhui.net');

  this.setState({
    out:'o'
  })

}
GetHot(url){
  fetch(url,{
    method:'POST',
    header:{
   //    'Accpet':'application/json',
      'Content-Type':'application/json',
    },

   //  JSON.stringify({Email:'jxing010@163.com',  Password:'b945ef32dd6dc42cac45e7226f793bdb'  ,FromType: '2'

 //  })
  })
  .then(response=>response.json())
  .then(result=>{
     this.setState({
       hot:JSON.stringify(result),
     })
  })
  .catch(e=>{
    this.setState({
      hot:'e'
    })
  })
}
GetSubscribe(url){
  fetch(url,{
    method:'POST',
    header:{
   //    'Accpet':'application/json',
      'Content-Type':'application/json',
    },

   //  JSON.stringify({Email:'jxing010@163.com',  Password:'b945ef32dd6dc42cac45e7226f793bdb'  ,FromType: '2'

 //  })
  })
  .then(response=>response.json())
  .then(result=>{
     this.setState({
       sub:JSON.stringify(result),
     })
  })
  .catch(e=>{
    this.setState({
      sub:'e'
    })
  })
}

  render() {

    return (

      <View style={styles.container}>
        <Text style={styles.welcome}
          onPress={()=>this.loData('http://www.ishuhui.net/UserCenter/Login')
                                                          }
                                                        >
          Welcome to React Native!
        </Text>

        <Text style={styles.instructions}>
          {this.state.data}
          {this.state.Cookie}

        </Text>
        <Text
          onPress={()=>this.GetSubscribe('http://www.ishuhui.net/ComicBooks/GetSubscribe')}
          >get SUb</Text>
        <Text>{this.state.sub}</Text>
        <Text
          onPress={()=>this.GetHot('http://www.ishuhui.net/ComicBooks/GetHotKeyword')}
          >get hot</Text>
        <Text>{this.state.hot}</Text>
        <Text
          onPress={()=>this.Logout()}
          >LouOut</Text>
        <Text>{this.state.out}</Text>

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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
