/**
 * Created by Jonson
 */
import * as types from '../common/actionTypes';

const initialState = {
    keywordsList: [],           // 热搜词
    searchText: null,           // 搜索文本
    isLoading: true,
    isLoadMore: false,
    recomdData:[],
      history: [],
// CACHE_HISTORY
// CLEAR_HISTORY
}

let searchReducer = (state = initialState, action={})=> {

    switch (action.type) {
        case types.FETCH_KEYWORDS_LIST:
            return Object.assign({}, state, {
                ...state
            })
        case types.RECEIVE_KEYWORDS_LIST:
            return Object.assign({}, state, {
                keywordsList: action.keywordsList,
                history: action.history,
            })
       case types.CACHE_HISTORY:
            return Object.assign({}, state, {
                history: action.history,
            })
        case types.CLEAR_HISTORY:
            return Object.assign({}, state, {
                history: []
            })
        case types.RECEIVE_SEARCH_RESULT_LIST:
            return Object.assign({}, state, {
                tags: action.tags,
                searchResultList: state.isLoadMore ? state.searchResultList.concat(action.searchResultList) : action.searchResultList,
                isLoading: false,
            })
        case types.SELECT_KEYWORD:
            return Object.assign({}, state, {
                searchText: action.searchText,
            })
        case types.SETUP_SEARCH_TEXT:
            return Object.assign({}, state, {
                searchText: action.searchText,
            })
        case types.SELECT_RECOMMEND_TAG:
            return Object.assign({}, state, {
                recomdData: action.recomdData
            })
        case types.RESET_SEARCH_STATE:
            return initialState
        default:
            return state;
    }
}

export default searchReducer;
