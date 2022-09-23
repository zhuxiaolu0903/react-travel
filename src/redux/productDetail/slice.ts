import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../api";

interface ProductDetailState {
  loading: boolean
  data: any
}

const initialState: ProductDetailState = {
  loading: true,
  data: null
}

export const getProductDetail = createAsyncThunk(
  'productDetail/getProductDetail',
  async (touristRouteId: string) => {
    const {data} = await window.axios.get(`/api/touristRoutes/${touristRouteId}`)
    return data.productDetail
  }
)

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true
    },
    fetchSuccess(state, action) {
      state.data = action.payload
      state.loading = false
    },
    fetchFail(state) {
      state.data = null
      state.loading = false
    }
  },
  extraReducers: {
    [getProductDetail.pending.type]: (state) => {
      state.loading = true
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload
      state.loading = false
    },
    [getProductDetail.rejected.type]: (state) => {
      state.data = null
      state.loading = false
    }
  }
})
