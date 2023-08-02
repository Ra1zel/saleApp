import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import store from "./Store/store.ts";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProductPage from "./routes/ProductsPage.tsx"
import AddProductPage from "./routes/AddProductPage.tsx";

const router = createBrowserRouter([{
  path: "/",
  element: (
    <Provider store={store}>
      <App/>
    </Provider>),
  children: [
    {
      path: "",
      element: <ProductPage/>
    },
    {
      path: "/addProduct",
      element: <AddProductPage/>
    }
  ]
}])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
