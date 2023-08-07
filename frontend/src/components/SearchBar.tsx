import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"
import {styled} from "@mui/material"
import {Container} from "./UtilityComponents/Utilities.tsx"
import {useForm, SubmitHandler} from "react-hook-form";
import {AppDispatch, RootState} from "../Store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {activateSearch, deactivateSearch, setSearchString} from "../Store/SearchSlice.ts"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

const MyProductSearchBar = styled(TextField)({
  width: "400px"
})

type Input = {
  searchField: string
}
const ProductSearchBar = () => {
  const isSearchbarFocused = useSelector((state: RootState) => state.searchReducer.isSearchActive)
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    resetField
  } = useForm<Input>()
  const onSubmit: SubmitHandler<Input> = (data) => {
    dispatch(setSearchString(data.searchField))
  }
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}
            style={{
              position: "relative",
              margin: "10px",
              display: "flex",
              alignItems: "center"
            }}>
        <MyProductSearchBar  {...register("searchField")} className="searchType"
                             placeholder="Search for Products" onFocus={() => dispatch(activateSearch())}/>
        {isSearchbarFocused &&
            <CloseIcon onClick={() => {
              dispatch(deactivateSearch())
              resetField("searchField")
            }} sx={{position: "absolute", right: "65px", zIndex: "100"}}/>}
        <Button sx={{
          height: "100%",
          backgroundColor: "#FF206E",
          color: "white",
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0"
        }}>
          <SearchIcon sx={{}}/>
        </Button>
      </form>
    </Container>
  )
}

export default ProductSearchBar