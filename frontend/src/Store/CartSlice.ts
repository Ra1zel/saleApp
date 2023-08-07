import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type cartProductFields = {
  id: number,
  title: string,
  price: number,
  imageURL: string
}

export type CartItem = {
  product: cartProductFields
  quantity: number
}

type CartState = {
  cartItems: CartItem[]
  isCartShown: boolean
}

const initialState: CartState = {
  cartItems: [],
  isCartShown: false
}

const getIndexOfRequiredProduct = (cartItems: CartItem[], id: number | string) => {
  return cartItems.findIndex((item) => {
    return item.product.id == id
  })
}

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleIsCartShown: (state, action: PayloadAction<boolean>) => {
      state.isCartShown = action.payload
    },
    addProductToCart: (state, action: PayloadAction<cartProductFields>) => {
      if (state.cartItems.length === 0) {
        const cartItem = {
          product: action.payload,
          quantity: 1
        }
        state.cartItems.push(cartItem)
      } else {
        const currentCartItems = state.cartItems
        const indexOfProductInCart = getIndexOfRequiredProduct(currentCartItems, action.payload.id)
        if (indexOfProductInCart === -1) {
          state.cartItems.push({product: action.payload, quantity: 1})
        } else {
          state.cartItems[indexOfProductInCart].quantity += 1;
        }
      }
    },
    incrementProductQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload
      const currentCartItems = state.cartItems
      const indexOfProductInCart = getIndexOfRequiredProduct(currentCartItems, productId)
      state.cartItems[indexOfProductInCart].quantity += 1
    },
    decrementProductQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload
      const currentCartItems = state.cartItems
      const indexOfProductInCart = getIndexOfRequiredProduct(currentCartItems, productId)
      if (state.cartItems[indexOfProductInCart].quantity === 1) {
        //pass
        state.cartItems.splice(indexOfProductInCart, 1)
      } else {
        state.cartItems[indexOfProductInCart].quantity -= 1
      }
    },
    removeProductFromCart: (state, action: PayloadAction<number | string>) => {
      const productId = action.payload
      const indexOfProductInCart = getIndexOfRequiredProduct(state.cartItems, productId)
      state.cartItems.splice(indexOfProductInCart, 1,)
    }


  }
})
export const {
  incrementProductQuantity,
  decrementProductQuantity,
  toggleIsCartShown,
  addProductToCart,
  removeProductFromCart
} = CartSlice.actions
export default CartSlice.reducer