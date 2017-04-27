import * as types from './../common/actionTypes';

const initState = {
    PassionList: [],
    isLoading: true,
    isLoadMore: false,
    isRefresh: false,
}

let passionComicReducer = (state = initState, action) => {
    switch (action.type) {
        case types.LOAD_PASSION_LIST:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                isLoadMore: action.isLoadMore,
                isRefresh: action.isRefresh
            });
        case types.GET_PASSION_LIST:
            return Object.assign({}, state, {
                isLoading: false,
                isRefresh: false,
                PassionList: state.isLoadMore ? state.PassionList.concat(action.PassionList) : action.PassionList
            });
        default:
            return state;
    }
}

export default passionComicReducer;
