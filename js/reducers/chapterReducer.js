import * as types from './../common/actionTypes';

const initState = {
    ChapterList: [],
    isLoading: true,
    isLoadMore: false,
    isRefresh: false,
}

let chapterReducer = (state = initState, action) => {
    switch (action.type) {
        case types.LOAD_CHAPTER_LIST:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                isLoadMore: action.isLoadMore,
                isRefresh: action.isRefresh
            });
        case types.GET_CHAPTER_LIST:
            return Object.assign({}, state, {
                isLoading: false,
                isRefresh: false,
                ChapterList: state.isLoadMore ? state.ChapterList.concat(action.ChapterList) : action.ChapterList
            });
        default:
            return state;
    }
}

export default chapterReducer;
