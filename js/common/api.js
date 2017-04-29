
const BASE_API = "http://www.ishuhui.net/";


// 订阅

export const API_SUBSCRIBE_LIST= BASE_API + "ComicBooks/GetSubscribe?fromtype=2";

// 查询

export const API_SEARCH = BASE_API + "ComicBooks/GetAllBook?Title=";

//国产漫画 要填index试试没有PageIndex的结果

export const API_DOMESTIC_COMIC_LIST = BASE_API + "ComicBooks/GetAllBook?ClassifyId=2&Size=10&PageIndex=";


export const API_PASSION_COMIC_LIST = BASE_API + "ComicBooks/GetAllBook?ClassifyId=4&Size=10&PageIndex=";


export const API_SHUHUI_COMIC_LIST = BASE_API + "ComicBooks/GetAllBook?ClassifyId=3&Size=10&PageIndex=";

// 查询章节


//订阅章节
//参数 isSubscribe true or false  /bookId  /frometype=3
export const API_SUBSCRIBE = BASE_API+"ComicBooks/Subscribe"

//登录
//参数 FromType=5  /Email/  Password MD5加密
export const API_LOGIN = "http://www.ishuhui.net/UserCenter/Login"

//注册
