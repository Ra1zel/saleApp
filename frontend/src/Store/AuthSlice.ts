import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type authStatus = {
  isUserLoggedIn: boolean,
  userId: string
}

const initialState = {
  isUserLoggedIn: false,
  userId: ""
}

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<string>) => {
      state.isUserLoggedIn = true
      state.userId = action.payload
    },
    logoutUser: (state) => {
      state.isUserLoggedIn = false
      state.userId = ""
    }
  }
})

export const {loginUser, logoutUser} = authSlice.actions
export default authSlice.reducer;