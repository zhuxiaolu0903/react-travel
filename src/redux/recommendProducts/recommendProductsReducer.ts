import {
  FETCH_RECOMMEND_PRODUCTS_FAIL,
  FETCH_RECOMMEND_PRODUCTS_START,
  FETCH_RECOMMEND_PRODUCTS_SUCCESS, RecommendProductAction
} from './recommendProductsActions'

interface RecommendProductsState {
  loading: boolean
  productList: any[]
}

const defaultState = {
  loading: true,
  productList: []
}

export default (state = defaultState, action: RecommendProductAction) => {
  switch (action.type) {
    case FETCH_RECOMMEND_PRODUCTS_START:
      return {...state, loading: true}
    case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
      return {...state, loading: false, productList: action.payload}
    case FETCH_RECOMMEND_PRODUCTS_FAIL:
      return {...state, loading: false}
    default:
      return state
  }
}