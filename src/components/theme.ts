import {createTheme} from '@mui/material/styles';


export const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          ".MuiOutlinedInput-root": {
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0"
          }
        }
      }
    }
  },
  typography: {
    htmlFontSize: 16,
    h1: {
      fontFamily: "Borel",
      fontSize: "1.6rem",
      marginTop: "18px"
    },
    h2: {
      fontSize: 10,
      fontWeight: 500
    },
    fontFamily: "Quicksand",
    fontSize: 16,
    fontWeightRegular: 500
  },
});
