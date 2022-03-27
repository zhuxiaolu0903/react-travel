import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";

interface paramsType {
  keyword?: string
  pageSize: number
  pageNumber: number
}

export const searchProduct = createAsyncThunk(
  'productSearch/getProductList',
  async (params: paramsType) => {
    let url = `http://127.0.0.1:8080/api/touristRoutes?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`
    if (params.keyword) {
      url += '&keyword=' + params.keyword
    }
    const {data} = await axios.get(url)
    return data
  }
)

const initialState = {
  loading: true,
  total: 0,
  productList: null
}

export const productSearchSlice = createSlice({
  name: 'productSearch',
  initialState,
  reducers: {},
  extraReducers: {
    [searchProduct.pending.type]: (state) => {
      state.loading = true
    },
    [searchProduct.fulfilled.type]: (state, action) => {
      state.loading = false
      state.total = action.payload.total
      state.productList = action.payload.data
    },
    [searchProduct.rejected.type]: (state) => {
      state.loading = false
      state.productList = null
      state.total = 0
    }
  }
})