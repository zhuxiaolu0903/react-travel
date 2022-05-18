import {Middleware} from "redux";
import i18n from "i18next";
import {CHANGE_LANGUAGE} from "../language/languageActions";

export const actionLanguage: Middleware = () => (next) => (action) => {
  if (action.type === CHANGE_LANGUAGE) {
    i18n.changeLanguage(action.payload)
  }
  else if (action.type === 'persist/REHYDRATE' && action.payload) {
    // 开启持久化存储时，需要将语言包初始化
    i18n.changeLanguage(action.payload.language.language)
  }
  next(action)
}