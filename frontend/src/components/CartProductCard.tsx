import React from 'react';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  CartItem,
  decrementProductQuantity,
  incrementProductQuantity,
  removeProductFromCart
} from "../Store/CartSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../Store/store.ts";

const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`
const CartProductContainer = styled(Paper)`
  width: 350px;
  display: flex;
  padding: 15px;
  margin-top: 15px;
  margin-bottom: 15px;

`
const CartProductImage = styled('div')`
  width: 95px;
  height: 75px;
  background-color: aquamarine;
`
const QuantityRowContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledCartButton = styled(Button)`
  && {
    border-radius: 50%;
    padding: 0;
    background-color: rgba(128, 128, 128, 0.12);
    height: 30px;
    min-width: 30px;

    :disabled {
      background-color: rgba(128, 128, 128, 0.05);
    }

  }

  & .Mui-disabled {
    background-color: red;
  }

`
const CartProductCard: React.FC<CartItem> = ({quantity, product: {id, imageURL, title, price}}) => {
  const dispatch: AppDispatch = useDispatch()
  return (
    <CartProductContainer elevation={3} id={id.toString()}>
      <CartProductImage>
        <img src={imageURL} style={{width: "100%", height: "100%"}} alt={"product image"}/>
      </CartProductImage>
      <div style={{display: "flex", flexDirection: "column", flexGrow: '1'}}>
        <div style={{marginLeft: "20px", marginBottom: "10px"}}>
          <Typography>{title}</Typography>
          <Typography sx={{color: "gray", fontSize: "16px"}}>$ {price * quantity}</Typography>
        </div>
        <QuantityRowContainer>
          <Container>
            <StyledCartButton disabled={quantity === 0}
                              onClick={() => dispatch(decrementProductQuantity(id))}><RemoveIcon
              sx={{color: "gray", width: "20px"}}/></StyledCartButton>
            <Typography
              sx={{marginInline: "10px", padding: "5px", color: "gray"}}>{quantity}</Typography>
            <StyledCartButton onClick={() => dispatch(incrementProductQuantity(id))}><AddIcon
              sx={{color: "gray", width: "20px"}}/></StyledCartButton>
          </Container>
          <div>
            <Button onClick={() => dispatch(removeProductFromCart(id))} color={"error"}>
              <DeleteIcon/>
            </Button>
          </div>
        </QuantityRowContainer>
      </div>
    </CartProductContainer>
  );
};

export default CartProductCard;