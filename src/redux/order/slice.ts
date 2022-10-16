import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message, Modal } from 'antd'
import {checkout} from "../shoppingCart/slice";

interface OrderProps {
  loading: boolean
  orderItems: any[]
}

const initialState: OrderProps = {
  loading: false,
  orderItems: [],
}

export const placeOrder = createAsyncThunk(
  'order/placeOrder1',
  async (token: string) => {
    const { data } = await window.axios.post(
      '/api/order/placeOrder1',
      {},
      {
        headers: {
          'x-access-token': token,
        },
      }
    )
    return data
  }
)

export const getPendingOrder = createAsyncThunk(
  'order/getPendingOrder',
  async (token: string) => {
    const { data } = await window.axios.get(
      '/api/order/queryPendingOrder',
      {
        headers: {
          'x-access-token': token,
        },
      }
    )
    return data
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: {
    [placeOrder.pending.type]: (state) => {
      state.loading = true
    },
    [placeOrder.fulfilled.type]: (state, action) => {
      state.loading = false
      if (action.payload.success === false) {
        Modal.error({
          title: '支付失败',
          content: action.payload.message,
        })
      } else {
        message.success('支付成功！')
        state.orderItems = []
      }
    },
    [placeOrder.rejected.type]: (state) => {
      state.loading = false
    },
    [checkout.pending.type]: (state) => {
      state.loading = true
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.loading = false
      if (action.payload.success === true) {
        state.orderItems = [action.payload.orderItem]
      }
    },
    [checkout.rejected.type]: (state) => {
      state.loading = false
    },
    [getPendingOrder.pending.type]: (state) => {
      state.loading = true
    },
    [getPendingOrder.fulfilled.type]: (state, action) => {
      state.loading = false
      state.orderItems = action.payload.orderItems
    },
    [getPendingOrder.rejected.type]: (state) => {
      state.loading = false
    },
  },
})
