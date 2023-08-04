import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../Store/store.ts";
import {deleteProduct} from "../Store/ProductsSlice.ts";
import {addProductToCart, CartItem} from "../Store/CartSlice.ts";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import {useEffect, useState} from "react";
import Snackbar from "@mui/material/Snackbar"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant={"filled"} {...props}/>;
})


export const getQuantityOfCartProduct = (productId: number | string) => {
  return function (state: RootState): number | null {
    const requiredProduct = state.cartReducer.cartItems.find((item: CartItem) => {
      return item.product.id === productId
    })
    if (requiredProduct) {
      return requiredProduct.quantity;
    }
    return null;
  }
}


const ProductCard: React.FC<Product> = ({id, imageURL, title, price}) => {
  const dispatch: AppDispatch = useDispatch()
  const quantityOfProduct = useSelector(getQuantityOfCartProduct(id))
  const [open, setOpen] = useState(false)
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const addProductHandler = () => {
    const product = {
      id: id,
      title: title,
      price: price,
      imageURL: imageURL,
    }
    dispatch(addProductToCart(product))
    setOpen(true)

  }
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
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: "auto"
        }}>
          <Button sx={{backgroundColor: "#488286", color: "white"}}>View Product</Button>
          <Button sx={{backgroundColor: "#488286", color: "white"}} onClick={addProductHandler}>Add to Cart</Button>
        </div>
        <Snackbar anchorOrigin={{vertical: "top", horizontal: "left"}} open={open} autoHideDuration={6000}
                  onClose={handleClose}>
          <Alert onClose={handleClose} severity="success"
                 sx={{width: '100%', backgroundColor: "#93c9b6", color: "black"}}>
            <Typography>{`${title} has been added to your cart successfully.`}</Typography>
          </Alert>
        </Snackbar>
      </Paper>
    </div>
  );
};

export default ProductCard;