import {AUTH_USER,UNAUTH_USER,AUTH_ERROR,FETCH_MESSAGE} from '../common/actionTypes';
import {API_LOGIN, API_SUBSCRIBE} from '../common/api';
import Cookie from 'react-native-cookie';
import { AsyncStorage } from 'react-native';

export function signinUser({ email, password }) {
  return function(dispatch) {
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
        dispatch({ type: AUTH_USER });
        Cookie.get('http://www.ishuhui.net', 'PHPSESSID').then((cookie)=>{
          AsyncStorage.setItem('token',cookie,(error)=>{
          })
        })
      })
      .catch(() => {

        dispatch(authError('Bad Login Info'));
      });
  }
}
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  AsyncStorage.clear((error)=>{
  });
  Cookie.clear('http://www.ishuhui.net');
  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    fetch(API_SUBSCRIBE,{
      method:'POST',
      header:{
        'Content-Type':'application/json',
      },
    })
    .then(response=>response.json())
    .then(responseObj => {
       dispatch({
         type: FETCH_MESSAGE,
         payload: responseObj.Return.List
       });
     })
     .catch(error=>{

     })

  }
}
