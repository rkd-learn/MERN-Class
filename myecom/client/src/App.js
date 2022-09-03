import { Route, Routes } from "react-router-dom";

import { Home } from "./component/Home";
import { ProductPage } from "./component/ProductPage";
import { LoginPage } from "./component/LoginPage";
import { SignUpPage } from "./component/SignUpPage";
import { CartPage } from "./component/CartPage";

import { Nav } from "./common/nav";

function App() {
  return (
    <div className="container">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
