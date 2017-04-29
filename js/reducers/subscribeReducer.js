import * as types from './../common/actionTypes';

const initState = {
    SubscribeList: [],
    isLoading: true,
    isLoadMore: false,
    isRefresh: false,
}

let subscribeReducer = (state = initState, action) => {
    switch (action.type) {
        case types.LOAD_SUBSCRIBE_LIST:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                isLoadMore: action.isLoadMore,
                isRefresh: action.isRefresh
            });
        case types.GET_SUBSCRIBE_LIST:
            return Object.assign({}, state, {
                isLoading: false,
                isRefresh: false,
                SubscribeList: state.isLoadMore ? state.SubscribeList.concat(action.SubscribeList) : action.SubscribeList
            });
        default:
            return state;
    }
}

export default subscribeReducer;
