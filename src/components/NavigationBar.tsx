import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MainSvg from '../assets/main.svg'
import {Link} from "react-router-dom"
import Drawer from "@mui/material/Drawer"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {AppDispatch, RootState, useAppDispatch} from "../Store/store.ts";
import {CartItem, toggleIsCartShown} from "../Store/CartSlice.ts";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import CartProductCard from "./CartProductCard.tsx";

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const list = (anchor: 'right', cartProducts: CartItem[]) => {
  return (<div style={{padding: "15px", border: "2px solid gray", height: "100%"}}>
    <Container>
      <Typography sx={{marginBottom: "10px"}}>Your Cart</Typography>
      {cartProducts && (
        cartProducts.map((product: CartItem) => {
          return (
            <CartProductCard key={product.product.title} product={product.product} quantity={product.quantity}/>

          )
        })
      )}
    </Container>
  </div>)
}
export default function NavigationBar() {
  const dispatch: AppDispatch = useAppDispatch()
  const isCartShown = useSelector((state: RootState) => state.cartReducer.isCartShown)
  const cartProducts = useSelector((state: RootState) => state.cartReducer.cartItems)
  console.log(cartProducts)
  if (isCartShown) {
    console.log("cart is shown")
  }
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar sx={{justifyContent: "space-between"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h1" sx={{flexGrow: 0}}>
            Riko's
          </Typography>
          <Link to={'/'}
                style={{width: "50px", height: "50px", margin: 'auto', display: "flex", justifyContent: "center"}}>
            <img src={MainSvg} style={{width: "50px", height: "50px"}} alt="e-commerce logo"/>
          </Link>
          <Button sx={{marginLeft: "10px", backgroundColor: "#5783ab", flexGrow: 0, color: "white"}}>
            <Link to={'/addProduct'} style={{textDecoration: 'none', color: "inherit"}}>Add Product</Link>
          </Button>
          <Button color="inherit" sx={{flexGrow: 0}}>Login</Button>
          <Drawer sx={{}} anchor={"right"} open={isCartShown}
                  variant={"temporary"}
                  onClose={() => dispatch(toggleIsCartShown(false))}>{list("right", cartProducts)}</Drawer>
          <Button onClick={() => dispatch(toggleIsCartShown(!isCartShown))}><ShoppingCartIcon
            sx={{color: "white"}}/></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}





















