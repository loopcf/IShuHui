import * as types from '../common/actionTypes';
import {API_DOMESTIC_COMIC_LIST} from '../common/api';
import HttpUtil from '../utils/HttpUtils';

export let domesticComic = (PageIndex, isLoading, isLoadMore, isRefresh) => {
    return dispatch => {

        dispatch(loadDomesticData(isLoading, isLoadMore, isRefresh));
        return HttpUtil.fetchGet(API_DOMESTIC_COMIC_LIST,
            PageIndex,
            (jsonData) => {
                dispatch(receiveDomesticData(jsonData.List));
            },
            (err) => {
                dispatch(receiveDomesticData([]));
            })
    }
}

let loadDomesticData = (isLoading, isLoadMore, isRefresh) => {
    return {
        type: types.LOAD_DOMESTIC_LIST,
        isLoading: isLoading,
        isLoadMore: isLoadMore,
        isRefresh: isRefresh
    }
}

let receiveDomesticData = (DomesticList) => {
    return {
        type: types.GET_DOMESTIC_LIST,
        DomesticList:DomesticList
    }
}
