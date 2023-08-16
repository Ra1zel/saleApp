import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import store from "./Store/store.ts";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProductPage from "./routes/ProductsPage.tsx"
import AddProductPage from "./routes/AddProductPage.tsx";
import LoginPage from "./routes/LoginPage.tsx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


const router = createBrowserRouter([{
  path: "/",
  element: (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <App/>
      </Provider>
    </LocalizationProvider>),
  children: [
    {
      path: "",
      element: <ProductPage/>
    },
    {
      path: "/addProduct",
      element: <AddProductPage/>
    },
    {
      path: "/loginPage",
      element: <LoginPage/>
    }
  ]
}])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
