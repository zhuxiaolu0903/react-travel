import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'antd/dist/antd.css'
import './i18n/config'
import { Provider } from 'react-redux'
import rootStore from './redux/store'
import zhCN from 'antd/lib/locale/zh_CN'
import {ConfigProvider, Modal, Spin} from 'antd'
import { PersistGate } from 'redux-persist/integration/react'
import {userSlice} from "./redux/user/slice";
import axios from './api'
// 响应拦截
axios.interceptors.response.use((req: any) => {
    const {status, message} = req
    if (status !== 200) {
        Modal.error({
            title: '操作失败',
            content: message,
        });
    }
    return req
}, error => {
    if (error.message.indexOf('401') > -1) {
        Modal.error({
            title: '登录超时',
            content: '请重新登录后再试',
            onOk: () => rootStore.store.dispatch(userSlice.actions.onLogout())
        });
    }
    Promise.reject(error)
})
window.axios = axios

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={rootStore.store}>
        <PersistGate loading={<Spin />} persistor={rootStore.persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
