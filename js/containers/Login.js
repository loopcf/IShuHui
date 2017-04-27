import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  navigator,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import {connect} from 'react-redux';//将我们的页面和action链接起来
import {bindActionCreators} from 'redux';//将要绑定的actions和dispatch绑定到一起
import * as actionCreators from '../actions/loginAction';//导入需要绑定的actions
import Subscribe from './Subscribe';
import md5 from 'blueimp-md5';

class Login extends Component{

  constructor(props){
    super(props);

    this.state={
       sub:'sub',
    }
    this.login=this.login.bind(this);
    this.onChangeEmail=this.onChangeEmail.bind(this);
    this.onChangePswd=this.onChangePswd.bind(this);
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
   onChangeEmail(text){
     this.setState({'Email':text,});
   }

   onChangePswd(text){
     this.setState({'password':text,});
   }

   login(){

     if(!this.state.Email||!this.state.password){
       alert('用户名或密码不能为空！');
     }else{
       this.props.actions.signinUser({'email':this.state.Email,'password':md5(this.state.password)});//dispath 登陆
     }
   }

   //该方法首次不会执行，如果返回false，则reduer不会执行，，
   shouldComponentUpdate(nextProps,nextState){
      if(this.props.authenticated){
        this.setState({Email:'',password:''});

        this.props.navigator.push({
          component:Subscribe,
          name:Subscribe
        })
      }
     return true;
   }
   Logout(){
     Cookie.clear('http://www.ishuhui.net');

     this.setState({
       sub:'o'
     })

   }

   render(){
    console.log('render...');
     return(
      <View style={{flex:1, justifyContent: 'center',  backgroundColor: '#F5FCFF',
        alignItems: 'center',}}>
      <View style={{padding:20,marginTop:50}}>
      <View style={styles.item}><Text style={{width:70}}>邮箱号码</Text>
      <TextInput
      style={styles.input}
      onChangeText={this.onChangeEmail}
      placeholder='请输入邮箱号码'
      value={this.state.Email}
      />
      </View>
      <View style={styles.item}>
      <Text style={{width:70}}>密码</Text>
      <TextInput
      style={styles.input}
      onChangeText={this.onChangePswd}
      placeholder='请输入密码'
      secureTextEntry={true}
      value={this.state.password}
      />
      </View>

      <TouchableHighlight style={styles.button}
       underlayColor='#000000' onPress={this.login}>
      <Text style={{fontSize:16,color:'#fff'}}>登陆</Text>
      </TouchableHighlight>
      </View>

      <Text
        onPress={()=>this.GetSubscribe('http://www.ishuhui.net/ComicBooks/GetSubscribe')}
        >get SUb</Text>
      <ScrollView>
      <Text>{this.state.sub}</Text>
    </ScrollView>
    <Text
      onPress={()=>this.Logout()}
      >LouOut</Text>
    <Text>{this.state.sub}</Text>
        </View>



     );
   }
}

const styles =StyleSheet.create({
    item:{
      flexDirection:'row',
      alignItems:'center',
      height:50,
      width:200,
    },
    input:{
      fontSize:14,
        width:150,
    },
    button:{
      backgroundColor:'#1a191f',
      height:50,
      marginTop:40,
      justifyContent:'center',
      alignItems:'center'
    },
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
      width:150,
      height:150,
      borderRadius:10,
    },
});


function mapStateToProps(state){
  return { authenticated: state.authReducer.authenticated };
}
function mapDispatchToProps(dispatch){
  return {
      actions: bindActionCreators(actionCreators, dispatch)
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
