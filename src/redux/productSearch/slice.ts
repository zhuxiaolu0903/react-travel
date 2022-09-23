import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

interface paramsType {
  keyword?: string
  pageSize: number
  pageNumber: number
}

export const searchProduct = createAsyncThunk(
  'productSearch/getProductList',
  async (params: paramsType) => {
    let url = `api/touristRoutes?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`
    if (params.keyword) {
      url += '&keyword=' + params.keyword
    }
    const {data} = await window.axios.get(url)
    return data
  }
)

const initialState = {
  loading: true,
  total: 0,
  productList: []
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
      state.productList = []
      state.total = 0
    }
  }
})
