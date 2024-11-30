import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../store/productDetailsSlice";
import { Container } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../store/cartSlice";
import Swal from "sweetalert2";
import "./ProductDetails.scss";
import Loading from "../loading/Loading";
import useAuth from "../Auth/useAuthHook";

function ProductDetails() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector((state) => state.singleProduct.productDetails);
  const productDetailStatus = useSelector(
    (state) => state.singleProduct.singleProductStatus
  );
  const error = useSelector((state) => state.singleProduct.error);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  function increment() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function decrement() {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  function addToCartHandler(product) {
    let discountedPrice =
      product.price - product.price * (product.discountPercentage / 100);
    let totalPrice = quantity * discountedPrice;
    if (currentUser) {
      dispatch(
        addToCart({
          ...product,
          quantity,
          totalPrice: totalPrice.toFixed(2),
          discountedPrice: discountedPrice.toFixed(2),
        })
      );
      Swal.fire({
        title: "Good job!",
        text: "Added item to cart successfully",
        icon: "success",
        showConfirmButton: false,
        didOpen: function () {
          setTimeout(function () {
            Swal.close();
          }, 1500);
        },
      });
    } else {
      navigate("/login");
    }
  }

  return (
    <>
      {productDetailStatus === "LOADING" && <Loading />}
      <Container>
        {productDetailStatus === "SUCCESSED" && (
          <section className="productDetail">
            <div className="product__photoForProductDetail">
              <div className="photo-containerForProductDetail">
                <div className="photo-mainForProductDetail">
                  {product.images ? (
                    <img src={product.images} alt={product.title} />
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>
            </div>
            <div className="product__infoForProductDetail">
              <div className="titleForProductDetail">
                <h1>{product.title}</h1>
              </div>
              <div className="moreDescForProductDetail">
                <p>
                  <span>rating:</span> {product.rating}
                  <span>|</span>
                  <span>Brand:</span> {product.brand}
                  <span>|</span>
                  <span>category:</span> {product.category}
                </p>
              </div>
              <div className="priceForProductDetail">
                <p>
                  <span className="oldPrice">${product.price}</span>(inclusive
                  of all taxes)
                </p>
                <span className="newPrice">
                  $
                  {(
                    product.price -
                    product.price * (product.discountPercentage / 100)
                  ).toFixed(2)}
                  <button className="btn">
                    ({product.discountPercentage}% Off)
                  </button>
                </span>
              </div>
              <div className="descriptionForProductDetail">
                <p>{product.description}</p>
              </div>
              <div>
                <span className="quantity">Quantity:</span>
                <button class="quantity__minus" onClick={() => decrement()}>
                  <span>-</span>
                </button>
                <input
                  name="quantity"
                  type="text"
                  value={quantity}
                  class="quantity__input"
                />
                <button class="quantity__plus" onClick={() => increment()}>
                  <span>+</span>
                </button>
              </div>
              <div className="btnsForProductDetail">
                <button
                  className="addToCart--btnForProductDetail"
                  onClick={() => addToCartHandler(product)}
                >
                  <FaShoppingCart className="shoppingCartInProductDetailBtn" />
                  ADD TO CART
                </button>
              </div>
            </div>
          </section>
        )}
      </Container>
      {productDetailStatus === "FAILED" && (
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

export default ProductDetails;
