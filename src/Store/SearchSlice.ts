import {createSlice, PayloadAction} from "@reduxjs/toolkit";


type searchStateType = {
  isSearchActive: boolean,
  searchString: string
}
const initialState: searchStateType = {
  isSearchActive: false,
  searchString: ""
}

const searchSlice = createSlice(
  {
    name: "Search",
    initialState,
    reducers: {
      activateSearch: (state) => {
        state.isSearchActive = true
      },
      deactivateSearch: (state) => {
        state.isSearchActive = false
        state.searchString = ""
      },
      setSearchString: (state, action: PayloadAction<string>) => {
        state.searchString = action.payload
      }
    }
  })
export const {activateSearch, deactivateSearch, setSearchString} = searchSlice.actions
export default searchSlice.reducer