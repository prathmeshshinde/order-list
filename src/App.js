import "./App.css";
import Products from "./Products";
import Users from "./Users";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Orders from "./Orders";

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <Link to="/">
            <h1>Edvora Test</h1>
          </Link>
        </div>
        <div>
          <div className="section-button">
            <Link to="/products">
              <button className="button">Products</button>
            </Link>
            <Link to="/orders">
              <button className="button">Orders</button>
            </Link>
          </div>
        </div>
        <hr />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
