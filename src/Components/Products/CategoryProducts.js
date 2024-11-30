import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCategoryProducts } from "../../store/categoryProductsSlice";
import Loading from "../loading/Loading";
import ProductList from "./ProductList";
import Title from "../HomePage/Title";

function CategoryProducts() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.categoryProducts.categoryProducts
  );
  const categoryStatus = useSelector(
    (state) => state.categoryProducts.categoryProductsStatus
  );

  const error = useSelector(
    (state) => state.categoryProducts.error
  );

  useEffect(() => {
    dispatch(fetchCategoryProducts(category));
  }, [dispatch, category]);

  return (
    <>
      {categoryStatus === "LOADING" && <Loading />}
      {categoryStatus === "SUCCESSED" && (
        <>
          <Title title={category} />
          <ProductList products={products} />
        </>
      )}
      {categoryStatus === "FAILED" && <h1 className="d-flex justify-content-center align-items-center" style={{height:"80vh"}}>{error}</h1>}
    </>
  );
}

export default CategoryProducts;
