/**
 * Created by Jonson
 */
import * as types from '../common/actionTypes';
import localStorage from '../common/localStorage';


export let fetchRecommendedList = (keyword)=> {

    let URL = 'http://www.ishuhui.net/ComicBooks/GetAllBook' ;

    return dispatch => {

        if(keyword==='')return;
        let formData = new FormData();
        formData.append("Title",keyword);
    fetch(URL,{
      method:'POST',
      header:{
        'Accpet':'application/json',
        'Content-Type':'application/json',
      },
      body: formData})
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
// 请求热搜关键词
export let fetchKeywords = ()=> {

    let URL = 'http://www.ishuhui.net/ComicBooks/GetHotKeyword';

        return dispatch => {
            dispatch(fetchKeywordsList());
            fetch(URL)
                .then((response) => response.text())
                .then((response) => {
                  localStorage.cachedObject('SEARCH_HISTORY_KEY')
                      .then((historyKeywords)=> {
                          let history = historyKeywords ? historyKeywords : [];

                          dispatch(receiveKeywordsList(history, response));

                      });
                })
                .catch((err) => {
                  dispatch(receiveKeywordsList([], []));
                });
            }
    }

let fetchKeywordsList = ()=> {
    return {
        type: types.FETCH_KEYWORDS_LIST,
    }
}

let receiveKeywordsList = (history, keywords)=> {
    return {
        type: types.RECEIVE_KEYWORDS_LIST,
        history: history,
        keywordsList: keywords,
    }
}


export let selectKeyword = (keyword)=> {

    return dispatch => {
        dispatch(setupSearchText(keyword))

        // 已缓存的搜索记录
        localStorage.cachedObject('SEARCH_HISTORY_KEY')
            .then((historyKeywords)=> {

                let history = historyKeywords ? historyKeywords : [];

                // 缓存中已有该搜索记录
                if (history.indexOf(keyword) != -1) return;

                history.push(keyword);

                localStorage.setObject('SEARCH_HISTORY_KEY', history);

                dispatch(cacheHistory(history))
            });
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

// 添加搜索记录
let cacheHistory = (history)=> {
    return {
        type: types.CACHE_HISTORY,
        history: history,
    }
}

// 清除搜索历史
export let clearHistory = ()=> {
    localStorage.clearCachedObject('SEARCH_HISTORY_KEY');

    return {
        type: types.CLEAR_HISTORY,
    }
}
