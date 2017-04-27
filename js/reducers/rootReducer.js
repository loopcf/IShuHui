import { combineReducers } from 'redux';

import shuhuiComicReducer from './shuhuiComicReducer';
import passionComicReducer from './passionComicReducer';
import domesticComicReducer from './domesticComicReducer';
import chapterReducer from './chapterReducer';
import authReducer from './authReducer';
import searchReducer from './searchReducer';
export default rootReducer = combineReducers({
  shuhuiComicReducer,
  passionComicReducer,
  domesticComicReducer,
  chapterReducer,
  authReducer,
  searchReducer
})
