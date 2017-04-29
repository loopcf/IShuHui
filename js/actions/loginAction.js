import * as TYPES from '../common/actionTypes';
import {API_LOGIN, API_SUBSCRIBE} from '../common/api';
import Cookie from 'react-native-cookie';
import { AsyncStorage,Alert } from 'react-native';

export function signinUser({ email, password }) {
  return (dispatch) => {
    dispatch({'type': TYPES.LOGGED_DOING});
        let formData = new FormData();
         formData.append("Email",email);
         formData.append("Password",password);
         formData.append("FromType","2");
         let result   = fetch(API_LOGIN,{
        method:'POST',
        header:{
          'Accpet':'application/json',
          'Content-Type':'application/json',
        },
        body: formData
      }
    )
      .then(response=>response.json())
      .then(response => {
        if(response.ErrMsg==='0'){
        dispatch({'type': TYPES.LOGGED_IN});
        Cookie.get('http://www.ishuhui.net', 'PHPSESSID').then((cookie)=>{
          AsyncStorage.setItem('token',cookie,(error)=>{
          })
        })
      }else{
        Alert.alert("帐号密码错误");
      }
      })
      .catch(() => {
          Alert.alert('帐号密码错误');
          dispatch({'type': TYPES.LOGGED_ERROR, error: e});
      });
  }
}
// export function authError(error) {
//   return {
//     type: AUTH_ERROR,
//   };
// }

export function signoutUser() {
  AsyncStorage.clear((error)=>{
  });
  Cookie.clear('http://www.ishuhui.net');
  return { 'type': TYPES.LOGGED_OUT};
}

// export function fetchMessage() {
//   return function(dispatch) {
//     fetch(API_SUBSCRIBE,{
//       method:'POST',
//       header:{
//         'Content-Type':'application/json',
//       },
//     })
//     .then(response=>response.json())
//     .then(responseObj => {
//        dispatch({
//          type: FETCH_MESSAGE,
//          payload: responseObj.Return.List
//        });
//      })
//      .catch(error=>{
//
//      })
//
//   }
// }
