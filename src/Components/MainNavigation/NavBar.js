//icons
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
//react-bootstrap
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { NavDropdown } from "react-bootstrap";
//external files
import "./NavBar.scss";
import SideNav from "./SideNav";
//sweet alert
import Swal from "sweetalert2";
//react
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
//slices

//auuthentication
import useAuth from "../Auth/useAuthHook";
import { signOut } from "firebase/auth";
import auth from "../../firebase.config";

function NavBar() {
  const categories = useSelector((state) => state.category.categoryList);
  const categoriesStatus = useSelector(
    (state) => state.category.categoryListStatus
  );
  const cart = useSelector((state) => state.cart.cart);
  const [searchParam, SetSearchParam] = useState("");
  const [min, setMin] = useState(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  function handleSearch(searchValue) {
    SetSearchParam(searchValue);
  }

  //make sure to logout
  function handleLogout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout me!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await signOut(auth);
          return navigate("/");
        } catch (error) {
          throw new Error(error);
        }
      }
    });
  }

  window.onresize = () => {
    if (window.innerWidth < 551) {
      setMin(true);
    } else {
      setMin(false);
    }
  };

  return (
    <>
      <Navbar className="navbar">
        <Container className="top">
          <NavDropdown title="Features" id="basic-nav-dropdown">
            <NavDropdown.Item>Seller center</NavDropdown.Item>
            <NavDropdown.Item>Download</NavDropdown.Item>
            <NavDropdown.Item>Support</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              Follow us on <FaFacebook />
              <FaInstagram />
            </NavDropdown.Item>
          </NavDropdown>

          <Navbar.Collapse className="navBar-header-left">
            <NavLink>Seller Center</NavLink>
            <NavLink>Download</NavLink>
            <NavLink>
              Follow us on <FaFacebook />
              <FaInstagram />
            </NavLink>
          </Navbar.Collapse>

          <Navbar.Collapse className="navBar-header-right">
            <NavLink className="support">
              <MdContactSupport />
              Support
            </NavLink>

            {currentUser ? (
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to={"/register"}
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Register
                </NavLink>
                {/* <span>|</span> */}
                <NavLink
                  to={"/login"}
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Login
                </NavLink>
              </>
            )}
          </Navbar.Collapse>
        </Container>

        <Container>
          <hr />
        </Container>

        <Container className="mt-3">
          <div className="bottom">
            <div className="bottom-left">
              <SideNav />
              <Link to={"/"}>
                <FaShoppingBag className="shoppingBag" />
              </Link>
              <Link to={"/"}>
                <h3>Shop</h3>
              </Link>
            </div>

            <Form className="bottom-center">
              <InputGroup>
                <Form.Control
                  placeholder={
                    min ? "Search here" : "Search your preferred items here"
                  }
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                  onChange={(e) => handleSearch(e.target.value)}
                  defaultValue={searchParam}
                />

                <Link
                  to={
                    searchParam
                      ? `/products/search/${searchParam}`
                      : `/products/search/not-found`
                  }
                >
                  <InputGroup.Text id="basic-addon1">
                    <FaSearch />
                  </InputGroup.Text>
                </Link>
              </InputGroup>
              <div className="categories">
                {categoriesStatus === "LOADING" && (
                  <h3 style={{ color: "white", fontSize: "small" }}>
                    loading catogries...
                  </h3>
                )}
                {categoriesStatus === "SUCCESSED" &&
                  categories.length > 8 &&
                  categories.slice(0, 8).map((cat, idx) => (
                    <NavLink
                      className="category"
                      to={`/products/category/${cat}`}
                      style={({ isActive }) => ({
                        color: isActive ? "greenyellow" : "white",
                      })}
                      key={idx}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </NavLink>
                  ))}
                {categoriesStatus === "FAILED" && (
                  <h3>failed to load catogries</h3>
                )}
              </div>
            </Form>
            <div className="bottom-right">
              <Link to={currentUser ? "/cart" : "/login"}>
                <i className="fas fa-bell">
                  <FaShoppingCart />
                </i>
                <span className="badge rounded-pill badge-notification bg-danger">
                  {currentUser ? cart.length : 0}
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
