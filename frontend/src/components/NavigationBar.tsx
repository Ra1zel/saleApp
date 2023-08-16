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
import {logoutUser} from "../Store/AuthSlice.ts";

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: scroll;
`
const BillContainer = styled('div')`
  margin-top: auto;
  width: 100%;
  height: 150px !important;
  background-color: #e6f6fc;
  border-radius: 15px 15px 0 0;
  box-shadow: 0 -2px 5px rgba(128, 128, 128, 0.18);
`

const calculateSubTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((subtotal, cartItem) => {
    subtotal += cartItem.quantity * cartItem.product.price
    return subtotal
  }, 0)
}
const CheckoutButton = styled(Button)`
  && {
    margin-bottom: 20px;
    background-color: #ff8150;
    color: white;
    margin-top: auto;

    :hover {
      background-color: #f6672e;
    }
  }
`
const list = (anchor: 'right', cartProducts: CartItem[]) => {
  const TAX_FRACTION = 0.02
  const subtotal = Number(calculateSubTotal(cartProducts).toFixed(2))
  const tax = (TAX_FRACTION * subtotal).toFixed(2)
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      position: "relative",
      padding: "15px 15px 0 15px",
      minWidth: "350px",
      border: "2px solid gray",
      height: "100%",
      overflowY: "scroll"
    }}>
      <Container>
        <Typography sx={{
          marginBottom: "20px",
          textAlign: "center",
          boxShadow: "0 2px 5px rgba(128, 128, 128, 0.18)",
          width: "100%"
        }}
                    variant={"h1"}>Your
          Cart</Typography>
      </Container>
      <Container>
        <div>
          {cartProducts.length === 0 ?
            <Typography sx={{marginTop: "250px"}}>Your Cart is currently empty :(</Typography> :
            (
              cartProducts.map((product: CartItem) => {
                return (
                  <CartProductCard key={product.product.title} product={product.product} quantity={product.quantity}/>

                )
              })
            )
          }
        </div>
      </Container>
      <BillContainer>
        <div style={{display: "flex", flexDirection: "column", height: "100%", padding: "15px"}}>
          <Typography>Sub Total : $ {subtotal}</Typography>
          <Typography>Tax : $ {tax}</Typography>
          <Typography>Total Amount: $ {(subtotal + Number(tax)).toFixed(2)}</Typography>
          <CheckoutButton>Proceed to Checkout</CheckoutButton>
        </div>
      </BillContainer>
    </div>)
}

const NavBarButton = styled(Button)`
  margin-left: 10px;
  background-color: #5783ab;
  flex-grow: 0;
  color: white;

  :hover {
    background-color: #3e5678;
  }
`
export default function NavigationBar() {
  const dispatch: AppDispatch = useAppDispatch()
  const isCartShown = useSelector((state: RootState) => state.cartReducer.isCartShown)
  const cartProducts = useSelector((state: RootState) => state.cartReducer.cartItems)
  const isUserLoggedIn = useSelector((state: RootState) => state.authReducer.isUserLoggedIn)
  const logoutHandler = () => {
    dispatch(logoutUser())
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
          <NavBarButton sx={{}}>
            <Link to={'/addProduct'} style={{textDecoration: 'none', color: "inherit"}}>Add Product</Link>
          </NavBarButton>
          {
            isUserLoggedIn ? <NavBarButton onClick={logoutHandler}>Log out</NavBarButton> : (
              <NavBarButton color="inherit" sx={{flexGrow: 0}}>
                <Link to={'/loginPage'} style={{textDecoration: 'none', color: "inherit"}}>
                  Login
                </Link>
              </NavBarButton>
            )
          }

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

