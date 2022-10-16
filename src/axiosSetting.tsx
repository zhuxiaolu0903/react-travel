import axios from 'axios'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import React from 'react'
import { userSlice } from './redux/user/slice'
import rootStore from './redux/store'

// 登录超时
const goLogin = () => {
  Modal.confirm({
    title: '确认退出',
    icon: <ExclamationCircleOutlined />,
    content: '登录超时，请重新登录',
    onOk: () => {
      rootStore.store.dispatch(userSlice.actions.onLogout())
    },
  })
}

axios.interceptors.response.use(
  function (response) {
    let {
      data: { code },
    } = response
    if (code === 401) {
      goLogin()
      return {}
    }
    return response
  },
  function (error) {
    if (error.response) {
      if (error.response.status == 401) {
        goLogin()
      }
      return Promise.reject(error.response)
    } else if (error.request) {
      if (error.request.status == 401) {
        goLogin()
      }
      return Promise.reject(error.request)
    } else {
      goLogin()
      return Promise.reject(error.message)
    }
  }
)
