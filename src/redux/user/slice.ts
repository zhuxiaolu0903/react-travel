import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Modal } from 'antd'

interface UserState {
  submitLoading: boolean
  token: string | null
}

const initialState: UserState = {
  submitLoading: false,
  token: null,
}

export const signIn = createAsyncThunk(
  'userSlice/signIn',
  async (parameters: { username: string; password: string }) => {
    const { data } = await window.axios.post('/auth/login', {
      username: parameters.username,
      password: parameters.password,
    })
    return data
  }
)

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    onLogout: (state) => {
      state.token = null
    },
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.submitLoading = true
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.submitLoading = false
      if (!action.payload.success) {
        Modal.error({
          title: '登录失败',
          content: action.payload.message,
        })
      } else {
        state.token = action.payload.token
      }
    },
    [signIn.rejected.type]: (state, action) => {
      state.submitLoading = false
      Modal.error({
        title: '登录失败',
        content: action.payload.message,
      })
    },
  },
})
