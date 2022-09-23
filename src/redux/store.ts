import LanguageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
import { actionLanguage } from './middleware'
import { productDetailSlice } from './productDetail/slice'
import { productSearchSlice } from './productSearch/slice'
import { shoppingCartSlice } from "./shoppingCart/slice";
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userSlice } from './user/slice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  language: LanguageReducer,
  user: userSlice.reducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'language'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store  = createStore(rootReducer, applyMiddleware(thunk, actionLanguage))

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false
    }),
    actionLanguage,
  ],
  devTools: true,
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState> // 获取函数返回值类型

export default { store, persistor }
