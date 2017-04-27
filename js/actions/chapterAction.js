import * as types from '../common/actionTypes';
import HttpUtil from '../utils/HttpUtils';

export let chapter = (id,PageIndex, isLoading, isLoadMore, isRefresh) => {
    return dispatch => {
        let url = "http://www.ishuhui.net/ComicBooks/GetChapterList?id="+id+"&PageIndex="
        console.log(url);
        console.log('capter')
        dispatch(ChapterData(isLoading, isLoadMore, isRefresh));
        return HttpUtil.fetchGet(url,
            PageIndex,
            (jsonData) => {
                dispatch({
                    type: types.GET_CHAPTER_LIST,
                    ChapterList: jsonData.List,
                });
            },
            (err) => {
                dispatch({
                    type: types.GET_CHAPTER_LIST,
                    ChapterList:[]
                });
            })
    }
}

let ChapterData = (isLoading, isLoadMore, isRefresh) => {
    return {
        type: types.LOAD_CHAPTER_LIST,
        isLoading: isLoading,
        isLoadMore: isLoadMore,
        isRefresh: isRefresh
    }
}

// let receiveShuhuiData = (ShuhuiList) => {
//    console.log('receiveShuhuiData');
//     return {
//         type: types.GET_SHUHUI_LIST,
//         ShuhuiList:ShuhuiList
//     }
// }
