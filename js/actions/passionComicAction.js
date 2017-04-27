import * as types from '../common/actionTypes';
import {API_PASSION_COMIC_LIST} from '../common/api';
import HttpUtil from '../utils/HttpUtils';

export let passionComic = (PageIndex, isLoading, isLoadMore, isRefresh) => {
    return dispatch => {

        dispatch(loadPassionData(isLoading, isLoadMore, isRefresh));
        return HttpUtil.fetchGet(API_PASSION_COMIC_LIST,
            PageIndex,
            (jsonData) => {
                dispatch(receivePassionData(jsonData.List));
            },
            (err) => {
                dispatch(receivePassionData([]));
            })
    }
}

let loadPassionData = (isLoading, isLoadMore, isRefresh) => {
    return {
        type: types.LOAD_PASSION_LIST,
        isLoading: isLoading,
        isLoadMore: isLoadMore,
        isRefresh: isRefresh
    }
}

let receivePassionData = (PassionList) => {
    return {
        type: types.GET_PASSION_LIST,
        PassionList:PassionList
    }
}
