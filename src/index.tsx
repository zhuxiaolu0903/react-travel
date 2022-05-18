import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'antd/dist/antd.css'
import './i18n/config'
import { Provider } from 'react-redux'
import rootStore from './redux/store'
import zhCN from 'antd/lib/locale/zh_CN'
import {ConfigProvider, Spin} from 'antd'
import { PersistGate } from 'redux-persist/integration/react'

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
