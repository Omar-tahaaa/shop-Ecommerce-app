import { GiHamburgerMenu } from "react-icons/gi";
import "./SideNav.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SideNav() {
  const categories = useSelector((state) => state.category.categoryList);
  const categoriesStatus = useSelector((state) => state.category.categoryListStatus);
  const [sideNavWidth, SetSideNavWidth] = useState("0");
  function openNav() {
    SetSideNavWidth("280px");
  }

  function closeNav() {
    SetSideNavWidth("0");
  }

  return (
    <>
      <div id="mySidenav" className="sidenav" style={{ width: sideNavWidth }}>
        <h5>ALL CATEGORIES</h5>
        <button className="closebtn" >
          <span onClick={closeNav}>&times;</span>
        </button>
        <div className="allCategories">
        {categoriesStatus ==="LOADING" && <h3>loading catogries...</h3>}
        {categoriesStatus ==="SUCCESSED" && categories.map((cat, idx) => (
          <div key={idx}>
            <Link to={`/products/category/${cat}`}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
            <hr className="horizontalLine"/>
          </div>
        ))}
        {categoriesStatus === "FAILED" && <h3>failed to load catogries</h3>}
        </div>
      </div>

      <span>
        <GiHamburgerMenu onClick={() => openNav()} />
      </span>
    </>
  );
}
