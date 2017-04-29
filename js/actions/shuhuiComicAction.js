import * as types from '../common/actionTypes';
import {API_SHUHUI_COMIC_LIST} from '../common/api';
import HttpUtil from '../utils/HttpUtils';

export let shuhuiComic = (PageIndex, isLoading, isLoadMore, isRefresh) => {
    return dispatch => {

        dispatch(loadShuhuiData(isLoading, isLoadMore, isRefresh));
        return HttpUtil.fetchGet(API_SHUHUI_COMIC_LIST,
            PageIndex,
            (jsonData) => {
                dispatch({
                    type: types.GET_SHUHUI_LIST,
                    ShuhuiList: jsonData.List,
                });
            },
            (err) => {
                dispatch({
                    type: types.GET_SHUHUI_LIST,
                    ShuhuiList:[]
                });
            })
    }
}

let loadShuhuiData = (isLoading, isLoadMore, isRefresh) => {
    return {
        type: types.LOAD_SHUHUI_LIST,
        isLoading: isLoading,
        isLoadMore: isLoadMore,
        isRefresh: isRefresh
    }
}
