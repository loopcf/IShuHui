import * as types from './../common/actionTypes';

const initState = {
    DomesticList: [],
    isLoading: true,
    isLoadMore: false,
    isRefresh: false,
}

let domesticComicReducer = (state = initState, action) => {
    switch (action.type) {
        case types.LOAD_DOMESTIC_LIST:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                isLoadMore: action.isLoadMore,
                isRefresh: action.isRefresh
            });
        case types.GET_DOMESTIC_LIST:
            return Object.assign({}, state, {
                isLoading: false,
                isRefresh: false,
                DomesticList: state.isLoadMore ? state.DomesticList.concat(action.DomesticList) : action.DomesticList
            });
        default:
            return state;
    }
}

export default domesticComicReducer;
