import NavigationBar from './components/NavigationBar.tsx'
import './App.css';
import {ThemeProvider} from "@mui/material";
import {theme} from "./components/theme.ts";
import {QueryClientProvider, QueryClient} from "react-query";
import {Outlet} from "react-router-dom"

function App() {
  const queryClient = new QueryClient();
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
