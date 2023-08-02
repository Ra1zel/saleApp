import {configureStore} from '@reduxjs/toolkit'
import productsReducer from "./ProductsSlice.ts";
import searchReducer from "./SearchSlice.ts"
import {useDispatch} from "react-redux";

const store = configureStore({
  reducer: {
    productsReducer: productsReducer,
    searchReducer: searchReducer
  }
})
export type  RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => {
  return useDispatch<AppDispatch>()
}
export default store;
