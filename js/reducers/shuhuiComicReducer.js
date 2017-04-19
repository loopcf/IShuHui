import * as types from './../common/actionTypes';

const initState = {
    ShuhuiList: [],
    isLoading: true,
    isLoadMore: false,
    isRefresh: false,
}

let shuhuiComicReducer = (state = initState, action) => {
    switch (action.type) {
        case types.LOAD_SHUHUI_LIST:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                isLoadMore: action.isLoadMore,
                isRefresh: action.isRefresh
            });
        case types.GET_SHUHUI_LIST:
            return Object.assign({}, state, {
                isLoading: false,
                isRefresh: false,
                ShuhuiList: state.isLoadMore ? state.ShuhuiList.concat(action.ShuhuiList) : action.ShuhuiList
            });
        default:
            return state;
    }
}

export default shuhuiComicReducer;
