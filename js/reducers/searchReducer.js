import * as types from '../common/actionTypes';

const initialState = {
    searchText: null,
    recomdData:[],
}

let searchReducer = (state = initialState, action={})=> {

    switch (action.type) {
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
