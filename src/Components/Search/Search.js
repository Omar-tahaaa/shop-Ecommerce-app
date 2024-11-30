import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "../loading/Loading";
import ProductList from "../Products/ProductList";
import notFoundProductImage from "../../assets/product_not_found.jpeg";
import "./Search.scss";
import { useParams } from "react-router-dom";
import { fetchSearchProducts } from "../../store/searchSlice";
import Title from "../HomePage/Title";

function Search() {
  const searchProducts = useSelector((state) => state.search.searchProducts);
  const searchProductsStatus = useSelector(
    (state) => state.search.fetchSearchProductsStatus
  );
  const error = useSelector((state) => state.search.error);
  const { searchParam } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParam) {
      dispatch(fetchSearchProducts(searchParam));
    }
  }, [dispatch, searchParam]);

  return (
    <>
      {searchProductsStatus === "LOADING" && <Loading />}
      {searchProducts.length === 0 && searchProductsStatus === "SUCCESSED" &&
        <div className="notFound">
          <img
            className="imageNotFound"
            src={notFoundProductImage}
            alt="not found items"
          />
        </div>
      }
      {searchProducts.length > 0 && searchProductsStatus === "SUCCESSED" &&
        <>
        <Title title="Search Products:" />
        <ProductList products={searchProducts} />
      </>
      }
      {searchProductsStatus === "FAILED" && <h1 className="d-flex justify-content-center align-items-center" style={{height:"80vh"}}>{error}</h1>}
    </>
  );
}

export default Search;
