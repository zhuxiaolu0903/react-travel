import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {message, Modal} from "antd";

interface ShoppingCartState {
    loading: boolean
    items: any[]
}

const initialState: ShoppingCartState = {
    loading: false,
    items: []
}

export const getShoppingCart = createAsyncThunk(
    'shoppingCart/getShoppingCart',
    async (token: string) => {
        const {data} = await window.axios.get('/api/shoppingCart', {
            headers: {
                'x-access-token': token
            }
        })
        return data.shoppingCartList
    }
)

export const addShoppingCartItem = createAsyncThunk(
    'shoppingCart/addShoppingCartItem',
    async (parameter: { token: string, itemId: string }) => {
        const {data} = await window.axios.post('/api/shoppingCart/items', {
            touristRouteId: parameter.itemId
        }, {
            headers: {
                'x-access-token': parameter.token
            }
        })
        return data
    }
)

export const clearShoppingCartItem = createAsyncThunk(
    'shoppingCart/clearShoppingCartItem',
    async (parameter: { token: string, itemIds: number[] }) => {
        const {data} = await window.axios.delete(`/api/shoppingCart/items/${parameter.itemIds.join(',')}`, {
            headers: {
                'x-access-token': parameter.token
            }
        })
        return data
    }
)

export const checkout = createAsyncThunk(
    'shoppingCart/checkout',
    async (token: string) => {
        const {data} = await window.axios.post('/api/shoppingCart/checkout', {}, {
            headers: {
                'x-access-token': token
            }
        })
        return data
    }
)

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: {
        [getShoppingCart.pending.type]: state => {
            state.loading = true
        },
        [getShoppingCart.fulfilled.type]: (state, action) => {
            state.items = action.payload
            state.loading = false
        },
        [getShoppingCart.rejected.type]: state => {
            state.items = []
            state.loading = false
        },
        [addShoppingCartItem.pending.type]: state => {
            state.loading = true
        },
        [addShoppingCartItem.fulfilled.type]: (state, action) => {
            state.loading = false
            if (action.payload.success === false) {
                Modal.error({
                    title: '添加失败',
                    content: action.payload.message,
                })
            } else {
                message.success('已添加！')
                state.items = action.payload.shoppingCartList
            }
        },
        [addShoppingCartItem.rejected.type]: state => {
            state.loading = false
        },
        [clearShoppingCartItem.pending.type]: state => {
            state.loading = true
        },
        [clearShoppingCartItem.fulfilled.type]: (state, action) => {
            state.loading = false
            if (action.payload.success === false) {
                Modal.error({
                    title: '删除失败',
                    content: action.payload.message,
                })
            } else {
                message.success('已删除！')
                state.items = action.payload.shoppingCartList
            }
        },
        [clearShoppingCartItem.rejected.type]: state => {
            state.loading = false
        },
        [checkout.pending.type]: state => {
            state.loading = true
        },
        [checkout.fulfilled.type]: (state, action) => {
            state.loading = false
            if (action.payload.success === false) {
                Modal.error({
                    title: '结算失败',
                    content: action.payload.message,
                })
            } else {
                message.success('已结算！')
                state.items = []
            }
        },
        [checkout.rejected.type]: state => {
            state.loading = false
        }
    }
})
