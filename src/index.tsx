import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import './i18n/config';
import {Provider} from "react-redux"
import store from "./redux/store";
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';

ReactDOM.render(
    <React.StrictMode>
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <App/>
        </Provider>
      </ConfigProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
