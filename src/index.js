import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

import HomePage from "./Components/HomePage/HomePage";
import ProductDetails from "./Components/Products/ProductDetails";
import CategoryProducts from "./Components/Products/CategoryProducts";
import Cart from "./Components/Cart/Cart";
import Search from "./Components/Search/Search";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "products/category/:category",
        element: <CategoryProducts />,
      },
      {
        path : "products/search/:searchParam",
        element : <Search />
      },
      {
        path : "cart",
        element : <Cart />
      },
      {
        path : "register",
        element : <Register />
      },
      {
        path : "login",
        element : <Login />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
