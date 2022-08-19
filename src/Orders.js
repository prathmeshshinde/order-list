import React, { useState, useEffect } from "react";

const Orders = () => {
  const [order, setOrder] = useState();
  const [isFilterOn, setFilterOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getOrders() {
      try {
        const res = await fetch("https://assessment.api.vweb.app/orders");
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        let items = await res.json();
        setOrder(items);
        setError(null);
      } catch (err) {
        setError(err.message);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    }

    getOrders();
  }, []);

  const filterData = () => {
    setFilterOn((prevState) => !prevState);
  };

  return (
    <div className="section-products">
      <div className="pro">
        <p className="product-title">Orders</p>{" "}
      </div>

      <div>
        <button
          className="button"
          onClick={filterData}
          style={{ marginTop: "30px" }}
        >
          Filter Quantity
        </button>
      </div>

      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}

      <div className="product-item">
        {order &&
          order
            .filter((item) => (isFilterOn ? item.quantity < 10 : true))
            .map((item) => (
              <div className="section-product-item">
                <p className="product-name"> Order ID: {item.order_id}</p>
                <p className="product-stock">Quantity: {item.quantity}</p>
                <p className="product-price">User ID: {item.user_id}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Orders;
