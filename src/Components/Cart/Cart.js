import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  clearCart,
  quantityFromCart,
  removeFromCart,
} from "../../store/cartSlice";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import "./Cart.scss";

import emptyCartImage from "../../assets/empty-cart.png";
import { FaShoppingBag } from "react-icons/fa";

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  function increaseQuantityHandler(cartItem) {
    dispatch(quantityFromCart({ type: "INC", cartItem }));
  }
  function decreaseQuantityHandler(cartItem) {
    dispatch(quantityFromCart({ type: "DEC", cartItem }));
  }

  function removeFromCartHandler(item) {
    dispatch(removeFromCart(item));
  }

  const initialValue = 0;
  let totalPriceOfItemInCart = cart.reduce(
    (acc, cartItem) => +acc + +cartItem.totalPrice,
    initialValue
  );

  function clearCartHandler() {
    dispatch(clearCart());
  }

  return (
    <div>
      {cart.length > 0 && cart ? (
        <Container>
          <ul className="responsive-table">
            <li className="table-header">
              <div className="col col-1"> Id</div>
              <div className="col col-2">Product</div>
              <div className="col col-3">Unit Price</div>
              <div className="col col-4">Quantity</div>
              <div className="col col-5">Total Price</div>
              <div className="col col-6">Actions</div>
            </li>
            {cart.map((cartItem) => {
              return (
                <li className="table-row" key={cartItem.id}>
                  <div className="col col-1" data-label="Id">
                    {cartItem.id}
                  </div>
                  <div className="col col-2" data-label="Product">
                    {cartItem.title}
                  </div>
                  <div className="col col-3" data-label="Unit Price">
                    ${cartItem.discountedPrice}
                  </div>
                  <div className="col col-4" data-label="Quantity">
                    <div>
                      <button
                        className="quantity__minus"
                        onClick={() => decreaseQuantityHandler(cartItem)}
                      >
                        <span>-</span>
                      </button>
                      <input
                        name="quantity"
                        type="text"
                        value={cartItem.quantity}
                        className="quantity__input"
                      />
                      <button
                        className="quantity__plus"
                        onClick={() => increaseQuantityHandler(cartItem)}
                      >
                        <span>+</span>
                      </button>
                    </div>
                  </div>
                  <div className="col col-5" data-label="Total Price">
                    ${cartItem.totalPrice}
                  </div>
                  <div className="col col-6" data-label="Actions">
                    <span onClick={() => removeFromCartHandler(cartItem)}>
                      Delete
                    </span>
                  </div>
                </li>
              );
            })}
            <li className="table-row">
              <div className="col col-1">
                <Button variant="danger" onClick={clearCartHandler}>
                  Clear Cart
                </Button>
              </div>
              <div className="col col-2">
                Total ({cart.length} Items) : $
                {totalPriceOfItemInCart.toFixed(2)}
              </div>
            </li>
          </ul>
        </Container>
      ) : (
        <div className="emptyCart">
          <img src={emptyCartImage} alt="empty cart" />
          <div>
            <Link to={"/"} className="goShopping">
              <button className="button-6">
                <FaShoppingBag />
                <span className="return">RETURN TO SHOP</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
