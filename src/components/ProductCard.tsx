import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../Store/store.ts";
import {deleteProduct} from "../Store/ProductsSlice.ts";

const ProductCard: React.FC<Product> = ({id, imageURL, title, price}) => {
  const dispatch: AppDispatch = useDispatch()
  return (
    <div>
      <Paper elevation={2}
             sx={{
               position: "relative",
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               width: "300px",
               height: "380px",
               margin: "25px 25px",
               padding: "15px"
             }}>
        <Button sx={{position: "absolute", left: "5px"}} color={"error"} onClick={() => dispatch(deleteProduct(id))}>
          <DeleteIcon/>
        </Button>
        <img style={{width: "180px", height: "150px"}} src={imageURL} alt="product Image"/>
        <Typography sx={{fontSize: "20px", fontWeight: "600", margin: "8px"}}>{title}</Typography>
        <Typography
          sx={{fontSize: "26px", fontWeight: "600", margin: "8px", alignSelf: "flex-end"}}>${price}</Typography>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-end", flexGrow: '1'}}>
          <Button sx={{backgroundColor: "#488286", color: "white", justifySelf: "flex-end"}}>View Product</Button>
        </div>
      </Paper>
    </div>
  );
};

export default ProductCard;