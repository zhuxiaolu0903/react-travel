import i18n from 'i18next'

export interface LanguageState {
    language: 'en' | 'zh'
    languageList: { name: string, code: string }[]
}

const defaultState: LanguageState = {
    language: 'zh',
    languageList: [
        {
            name: '中文',
            code: 'zh'
        },
        {
            name: 'English',
            code: 'en'
        }
    ]
}

export default (state = defaultState, action) => {
    // 根据action，返回最新的state
    const {type, payload} = action
    switch (type) {
        case 'change_language':
            i18n.changeLanguage(payload)
            return {...state, language: payload}
        case 'add_language':
            return {...state, languageList: [...state.languageList, payload]}
        default:
            return state
    }
}