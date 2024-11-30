import "./ProductList.scss";
import { Link } from "react-router-dom";

function ProductList({ products }) {
  return (
    <div className="shell">
      <div className="container">
        <div className="row">
          {products &&
            products.map((product) => {
              return (
                <div className="col-md-3" key={product.id}>
                  <div className="main-product">
                    <Link to={`/products/${product.id}`}>
                      <div className="product-img">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="img-responsive"
                          loading="lazy"
                        />
                      </div>

                      <div className="product-text">
                        <div className="category">
                          <span>{product.category}</span>
                        </div>
                        <div className="title-product">
                          <h3>{product.brand && `Brand: ${product.brand}`}</h3>
                        </div>
                        <div className="description-prod">
                          <p>{product.title}</p>
                        </div>
                        <div className="card-footer">
                          <div className="product-left">
                            {product.price && (
                              <div className="items price">
                                <span className="old">${product.price}</span>
                                <span className="new">
                                  $
                                  {(
                                    product.price -
                                    product.price *
                                      (product.discountPercentage / 100)
                                  ).toFixed(2)}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="product-right"></div>
                        </div>
                        <span className="discountPercentage">
                          ({product.discountPercentage}% Off)
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
