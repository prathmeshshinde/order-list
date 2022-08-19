import React, { useEffect, useState } from "react";

const Products = () => {
  const [product, setProduct] = useState(null);
  const [isFilterOn, setFilterOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch("https://assessment.api.vweb.app/products");
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        let items = await res.json();
        setProduct(items);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, []);

  const filterData = () => {
    setFilterOn((prevState) => !prevState);
  };

  return (
    <div className="section-products">
      <div className="pro">
        <p className="product-title">Products</p>
      </div>

      <div>
        <button
          className="button"
          style={{ marginTop: "30px" }}
          onClick={filterData}
        >
          Filter Price
        </button>
      </div>

      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}

      <div className="product-item">
        {product &&
          product
            .filter((item) => (isFilterOn ? item.selling_price < 100 : true))
            .map((item) => (
              <div className="section-product-item">
                <p className="product-name">{item.name}</p>
                <p className="product-stock">Stock: {item.stock}</p>
                <p className="product-price">
                  Selling Price: {item.selling_price}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Products;
