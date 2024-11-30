import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/productsSlice";
import ProductList from "./ProductList";
import Loading from "../loading/Loading";

function Products() {
  const dispatch = useDispatch();
  const productsStatus = useSelector((state) => state.products.productStatus);
  const products = useSelector((state) => state.products.productsData);
  const error = useSelector((state) => state.products.error);

  // randomizing the products in the list
  const tempProducts = [];
  if (products && products.length > 0) {
    for (let i in products) {
      let randomIndex = Math.floor(Math.random() * products.length);

      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }

  useEffect(() => {
    dispatch(fetchProducts(24));
  }, [dispatch]);

  return (
    <>
      {productsStatus === "LOADING" && <Loading />}
      {productsStatus === "SUCCESSED" && (
        <ProductList products={tempProducts} />
      )}
      {productsStatus === "FAILED" && (
        <h1
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          {error}
        </h1>
      )}
    </>
  );
}

export default Products;
