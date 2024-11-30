import { Outlet } from "react-router-dom";
import "./App.css";
import MainNavigation from "./Components/MainNavigation/MainNavigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoryList } from "./store/categorySlice";

function App() {
const dispatch = useDispatch()
  useEffect(() => {
      dispatch(fetchCategoryList())
  } , [dispatch])

  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}

export default App;
