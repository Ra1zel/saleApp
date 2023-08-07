import ProductSearchBar from "../components/SearchBar.tsx";
import {Divider} from "@mui/material";
import {Container} from "../components/UtilityComponents/Utilities.tsx";
import Typography from "@mui/material/Typography";
import ProductsContainer from "../components/ProductsContainer.tsx";

const ProductsPage = () => {
  return (
    <>
      <ProductSearchBar></ProductSearchBar>
      <Divider variant={"middle"}></Divider>
      <Container>
        <Typography variant={"h1"}>All Products</Typography>
      </Container>
      <ProductsContainer/>
    </>
  );
};

export default ProductsPage;