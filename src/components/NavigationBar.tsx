import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MainSvg from '../assets/main.svg'
import {Link} from "react-router-dom"

export default function NavigationBar() {
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
          <img src={MainSvg} alt="e-commerce logo" style={{width: "50px", height: "50px", flexGrow: '2'}}/>
          <Button sx={{marginLeft: "10px", backgroundColor: "#5783ab", flexGrow: 0, color: "white"}}>
            <Link to={'/addProduct'} style={{textDecoration: 'none', color: "inherit"}}>Add Product</Link>
          </Button>
          <Button color="inherit" sx={{flexGrow: 0}}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}