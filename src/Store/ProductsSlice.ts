import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchNotes = createAsyncThunk('products/fetch', async () => {
  const res = await axios.get('https://fakestoreapi.com/products')
  return res.data;

})

type state = {
  products: Product[]
  loading: boolean
  error: string | null
}
const initialState: state = {
  products: [],
  loading: false,
  error: null
}
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteProduct: (state, action: PayloadAction<number>) => {
      const idOfElementToDelete = action.payload
      state.products = state.products.filter(product => {
        return product.id !== idOfElementToDelete
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload.map((product) => {
          return {
            id: product.id,
            title: product.title,
            imageURL: product.image,
            description: product.description,
            price: product.price,
            rating: {
              rate: product.rating.rate,
              count: product.rating.count
            }
          }
        })
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Something went wrong'
      })
  }
})
export const {deleteProduct} = productsSlice.actions
export default productsSlice.reducer