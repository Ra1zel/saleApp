import {styled} from "@mui/material";
import {ReactNode} from "react";
import {useQuery} from "react-query";
import {AppDispatch, RootState, useAppDispatch} from "../Store/store.ts";
import {fetchNotes} from "../Store/ProductsSlice.ts";
import {useSelector} from "react-redux";
import ProductCard from "./ProductCard.tsx";

const MyProductsContainer = styled('div')({
  display: "flex",
  justifyContent: "center",
  height: "auto",
  flexWrap: "wrap",
  padding: "10px",
  margin: "50px 15px",
})


export type Props = {
  children: ReactNode
}

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const getFilteredProducts = (searchString: string, productsArray: Product[]): Product[] => {
  const escapedSearchString = escapeRegExp(searchString)
  const regex = new RegExp(escapedSearchString, "i")
  return productsArray.filter((product) => {
    return product.title.match(regex);
  });
}
const ProductsContainer = () => {
  const productsArray = useSelector((state: RootState) => state.productsReducer.products)
  const searchString = useSelector((state: RootState) => state.searchReducer.searchString)
  const dispatch: AppDispatch = useAppDispatch()
  useQuery("fetchProducts", () => {
    dispatch(fetchNotes())
  }, {refetchOnWindowFocus: false})
  let filteredArray: Product[] = []
  if (searchString) {
    filteredArray = getFilteredProducts(searchString, productsArray)
  }
  return (
    <MyProductsContainer>
      {searchString ? (
        filteredArray.map((product) => {
          return (
            <ProductCard {...product} key={product.id}/>
          )
        })
      ) : (
        productsArray.map((product) => {
          return (
            <ProductCard {...product} key={product.id}/>
          )
        })
      )}
    </MyProductsContainer>
  );
};

export default ProductsContainer;