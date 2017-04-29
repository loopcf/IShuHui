import * as types from '../common/actionTypes';
import {API_SUBSCRIBE_LIST} from '../common/api';
// import HttpUtil from '../utils/HttpUtils';

export let subscribeComic = ( isLoading, isLoadMore, isRefresh) => {
    return dispatch => {
        dispatch(loadSubscribeData(isLoading, isLoadMore, isRefresh));
        return fetch(API_SUBSCRIBE_LIST,{
          method:'POST',
          header:{
            'Accpet':'application/json',
            'Content-Type':'application/json',
          },
        })
        .then(response=>response.json())
        .then(result=>{
          console.log(result);
          // if(result.ErrCode===""){
          dispatch({
              type: types.GET_SUBSCRIBE_LIST,
              SubscribeList: result.Return.List,
          });
        // }  else{
            // dispatch({
                // type: types.GET_SUBSCRIBE_LIST,
                // SubscribeList:[]
            // });
          // }
      })

        .catch(err=>{
          dispatch({
              type: types.GET_SUBSCRIBE_LIST,
              SubscribeList:[]
          });
        })

    }
}

let loadSubscribeData = (isLoading, isLoadMore, isRefresh) => {
    return {
        type: types.LOAD_SUBSCRIBE_LIST,
        isLoading: isLoading,
        isLoadMore: isLoadMore,
        isRefresh: isRefresh
    }
}
