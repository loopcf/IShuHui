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
  DeviceEventEmitter,
} from 'react-native';

import {connect} from 'react-redux';//将我们的页面和action链接起来
import {bindActionCreators} from 'redux';//将要绑定的actions和dispatch绑定到一起
import * as actionCreators from '../actions/loginAction';//导入需要绑定的actions
import * as subscribeComic  from '../actions/subscribeAction';
import Subscribe from './Subscribe';
import md5 from 'blueimp-md5';
import Modal from 'react-native-modalbox';
import ViewUtils from '../utils/ViewUtils';
import NavigationBar from '../widget/NavigationBar';
let isLoading = true;
let isLoadMore = false;
let isRefresh = false;
class Login extends Component{

  constructor(props){
    super(props);
    console.log(this.props)
    this.state={
    }
    this.login=this.login.bind(this);
    this.onChangeEmail=this.onChangeEmail.bind(this);
    this.onChangePswd=this.onChangePswd.bind(this);
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

   shouldComponentUpdate(nextProps,nextState){
     if(nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn === true){
         this.refs.modal.close();

         this.toSubscribe();
         return false;
     }


     return true;

   }

  onBack(){
    this.props.navigator.pop();
  }
  toSubscribe(){
    this.subscription = DeviceEventEmitter.addListener('Function', ()=>{
      this.props.subscribeComic.subscribeComic(isLoading, isLoadMore, isRefresh);
    });

    this.props.navigator.pop();
  }
   render(){
    console.log('render...');
     return(
      <View style={{flex:1,  backgroundColor: '#F5FCFF',
      }}>
        <NavigationBar
          title={'登录'}
          leftButton={ViewUtils.getLeftButtion(()=>this.onBack())}
        />
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

        <Modal
        style={styles.modal}
        ref='modal'
        isOpen={this.props.status=='doing'?true:false}
        animationDuration={0}
        position={"center"}
        >
        <ActivityIndicator
        size='large'
        />
        <Text style={{marginTop:15,fontSize:16,color:'#444444'}}>登陆中...</Text>
        </Modal>
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
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    status: state.authReducer.status, };
}
function mapDispatchToProps(dispatch){
  return {
      actions: bindActionCreators(actionCreators, dispatch),
      subscribeComic:bindActionCreators(subscribeComic, dispatch)
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
