import NavigationBar from './components/NavigationBar.tsx'
import './App.css';
import {ThemeProvider} from "@mui/material";
import {theme} from "./components/theme.ts";
import {QueryClientProvider, QueryClient} from "react-query";
import {Outlet} from "react-router-dom"
import {useEffect} from "react";
import {AppDispatch} from "./Store/store.ts";
import {useDispatch} from "react-redux";
import {loginUser} from "./Store/AuthSlice.ts";
import {getUserIdFromCookie} from "./routes/LoginPage.tsx";

function App() {
  const queryClient = new QueryClient();
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    const userId = getUserIdFromCookie
    if (userId) {
      dispatch(loginUser(String(userId)))
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationBar></NavigationBar>
        <Outlet/>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
