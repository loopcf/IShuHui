import * as types from '../common/actionTypes';
import localStorage from '../common/localStorage';


export let fetchRecommendedList = (keyword)=> {

    let URL = 'http://www.ishuhui.net/ComicBooks/GetAllBook?Title='+keyword;

    return dispatch => {
    fetch(URL,{
      method:'POST',
      header:{
        'Accpet':'application/json',
        'Content-Type':'application/json',
      },

    }
    )
                .then((response) => response.json())
                .then((response) => {
                    dispatch(RecommendedList(response.Return.List))
                })
                .catch((err) => {

                    dispatch(RecommendedList([]))
                })
    }

}
let RecommendedList = (data)=> {
    return {
        type: types.SELECT_RECOMMEND_TAG,
        recomdData : data,
    }

}


export let resetState = ()=> {
    return {
        type: types.RESET_SEARCH_STATE,
    }
}

export let setupSearchText = (text)=> {
    if(text === 'null'){
        return {
        type: 1,

    }
    }else{
    return {
        type: types.SETUP_SEARCH_TEXT,
        searchText: text,
    }
    }
}
