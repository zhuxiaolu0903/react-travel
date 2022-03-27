import {createStore, applyMiddleware} from 'redux'
import LanguageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
import thunk from 'redux-thunk'
import {actionLanguage} from "./middleware";
import {productDetailSlice} from "./productDetail/slice";
import {productSearchSlice} from "./productSearch/slice";
import {combineReducers, configureStore} from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  language: LanguageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer
})

// const store  = createStore(rootReducer, applyMiddleware(thunk, actionLanguage))

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), actionLanguage],
  devTools: true
})

export type RootState = ReturnType<typeof store.getState> // 获取函数返回值类型

export default store