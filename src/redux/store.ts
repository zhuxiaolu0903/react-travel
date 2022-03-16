import {createStore, combineReducers, applyMiddleware} from 'redux'
import LanguageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
import thunk from 'redux-thunk'
import {actionLanguage} from "./middleware";

const rootReducer = combineReducers({
  language: LanguageReducer,
  recommendProducts: recommendProductsReducer
})

const store  = createStore(rootReducer, applyMiddleware(thunk, actionLanguage))

export type RootState = ReturnType<typeof store.getState> // 获取函数返回值类型

export default store